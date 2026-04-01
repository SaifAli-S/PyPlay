from extensions import db

class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    language = db.Column(db.String(50), default='python')
    order = db.Column(db.Integer, default=0)
    xp_reward = db.Column(db.Integer, default=10)
    content = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'language': self.language,
            'order': self.order,
            'xp_reward': self.xp_reward,
            'content': self.content
        }