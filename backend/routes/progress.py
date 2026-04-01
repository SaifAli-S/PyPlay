from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.progress import Progress
from models.user import User
from models.lesson import Lesson

progress_bp = Blueprint('progress', __name__)

@progress_bp.route('/complete', methods=['POST'])
@jwt_required()
def complete_lesson():
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or not data.get('lesson_id'):
        return jsonify({'error': 'Missing lesson_id'}), 400

    lesson = Lesson.query.get_or_404(data['lesson_id'])

    existing = Progress.query.filter_by(
        user_id=user_id,
        lesson_id=lesson.id
    ).first()

    if existing:
        return jsonify({'message': 'Lesson already completed'}), 200

    progress = Progress(user_id=user_id, lesson_id=lesson.id, completed=True)
    db.session.add(progress)

    user = User.query.get(user_id)
    user.xp += lesson.xp_reward

    db.session.commit()

    return jsonify({
        'message': 'Lesson completed!',
        'xp_earned': lesson.xp_reward,
        'total_xp': user.xp
    }), 200

@progress_bp.route('/', methods=['GET'])
@jwt_required()
def get_progress():
    user_id = get_jwt_identity()
    progress = Progress.query.filter_by(user_id=user_id).all()
    return jsonify([p.to_dict() for p in progress]), 200