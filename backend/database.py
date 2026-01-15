from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# 1. Create a SQLite database file named 'ecoloop.db' in the current directory
SQLALCHEMY_DATABASE_URL = "sqlite:///./ecoloop.db"

# 2. Create the SQLAlchemy engine
# connect_args={"check_same_thread": False} is needed specifically for SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# 3. Create a SessionLocal class
# This will be the main point of contact for database operations
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Create a Base class
# All ORM models will inherit from this
Base = declarative_base()

# 5. Dependency helper for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
