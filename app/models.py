from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique= True, index = True, nullable= False)
    hashed_password = Column(String, nullable=False)

class AccessLog(Base):
    __tablename__ = "access_logs"

    id = Column(Integer, primary_key=True, index=True)
    email= Column(String, index= True)
    ip_address= Column(String)
    user_agent = Column(String)
    timestamp = Column (DateTime, default=datetime.utcnow)