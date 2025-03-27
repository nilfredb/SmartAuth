from fastapi import APIRouter, HTTPException, Depends, Request
from app.schemas import UserCreate, Token, UserLogin
from app.auth import hash_password, create_access_token, verify_password
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models
from app.models import AccessLog

router = APIRouter()
msg= ("Register completed.")

#DB connection

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()


#Endpoints
@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user= db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_pw = hash_password(user.password)

    new_user = models.User(email=user.email, hashed_password=hashed_pw)

    #database save user process

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": new_user.email})

    return{"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(user: UserLogin, request: Request, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    #Access Log

    ip= request.client.host
    user_agent = request.headers.get("user-agent")

    log = AccessLog(
        email=user.email,
        ip_address=ip,
        user_agent=user_agent
    )

    db.add(log)
    db.commit()

    token = create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}