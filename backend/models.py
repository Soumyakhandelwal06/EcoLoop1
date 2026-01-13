from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Enum, Date
from sqlalchemy.orm import relationship
import enum
from .database import Base

# Enum for Level Status
class LevelStatus(str, enum.Enum):
    LOCKED = "locked"
    UNLOCKED = "unlocked"
    COMPLETED = "completed"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    coins = Column(Integer, default=0)
    streak = Column(Integer, default=0)
    last_login = Column(Date, nullable=True)
    profile_image = Column(String, nullable=True) # Optional avatar URL

    # Relationships
    progress = relationship("UserProgress", back_populates="user")

class Level(Base):
    __tablename__ = "levels"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)      # e.g., "Green Forest"
    description = Column(String) # e.g., "Learn about segregation"
    order = Column(Integer)     # 1, 2, 3...
    xp_reward = Column(Integer, default=100) # Coins reward
    theme_id = Column(String)   # 'forest', 'river' etc. for frontend map matching
    video_id = Column(String, default="dQw4w9WgXcQ") # YouTube Video ID
    task_description = Column(String, default="Upload a photo proving you completed the eco-task!")

    # Relationships
    user_progress = relationship("UserProgress", back_populates="level")
    questions = relationship("Question", back_populates="level")

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    level_id = Column(Integer, ForeignKey("levels.id"))
    text = Column(String)
    # Storing options as JSON string or comma-separated for simplicity in SQLite 
    # (JSON type is available in newer, but simple string with separator is safest for raw prototype)
    # Actually, we can just use 4 column fields or a delimiter. Let's use a delimiter '|'.
    options = Column(String) # "A|B|C|D"
    correct_index = Column(Integer) # 0-3
    difficulty = Column(Integer) # 1-5 (Increasing difficulty)

    level = relationship("Level", back_populates="questions")


class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    level_id = Column(Integer, ForeignKey("levels.id"))
    status = Column(String, default="locked") # 'locked', 'unlocked', 'completed'
    score = Column(Integer, default=0) # Quiz score (0-5)

    # Relationships
    user = relationship("User", back_populates="progress")
    level = relationship("Level", back_populates="user_progress")
