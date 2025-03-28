from fastapi import FastAPI
from app.routes import users
from app.database import Base, engine
from app import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    
    title="SmartAuth",
    #docs_url=None, # This blocks docs
    #redoc_url=None, #This blocks redocs
    #openapi_url=None  # This blocks json
)

app.include_router(users.router, prefix="/api/users")
models.Base.metadata.create_all(bind=engine)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can change this to your private address if you want
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
