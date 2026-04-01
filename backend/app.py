import os
from flask import Flask
from flask_cors import CORS
from extensions import db, jwt
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    @app.route('/')
    def home():
        return "PyPlay Backend is running 🚀"

    from routes.auth import auth_bp
    from routes.lessons import lessons_bp
    from routes.progress import progress_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(lessons_bp, url_prefix='/api/lessons')
    app.register_blueprint(progress_bp, url_prefix='/api/progress')

    return app

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)