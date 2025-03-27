from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#You can use SQLite to avoid PostgreSQL instalation if you want

SQLALCHEMY_DATABASE_URL = "sqlite:///./smartauth.db"

#However if you chose PostgreSQL, should be something like

# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/dbname"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False} #Just for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base= declarative_base()