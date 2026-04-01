from extensions import db
from datetime import datetime

class Progress(db.Model):
    __tablename__ = 'progress'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    score = db.Column(db.Integer, default=0)
    completed_at = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<Progress user={self.user_id} lesson={self.lesson_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'lesson_id': self.lesson_id,
            'completed': self.completed,
            'score': self.score,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }