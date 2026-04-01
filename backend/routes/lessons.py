from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models.lesson import Lesson
from models.question import Question

lessons_bp = Blueprint('lessons', __name__)

@lessons_bp.route('/', methods=['GET'])
@jwt_required()
def get_lessons():
    lessons = Lesson.query.order_by(Lesson.order).all()
    return jsonify([lesson.to_dict() for lesson in lessons]), 200

@lessons_bp.route('/<int:lesson_id>', methods=['GET'])
@jwt_required()
def get_lesson(lesson_id):
    lesson = Lesson.query.get_or_404(lesson_id)
    return jsonify(lesson.to_dict()), 200

@lessons_bp.route('/<int:lesson_id>/questions', methods=['GET'])
@jwt_required()
def get_questions(lesson_id):
    questions = Question.query.filter_by(lesson_id=lesson_id).all()
    return jsonify([q.to_dict() for q in questions]), 200


@lessons_bp.route('/<int:lesson_id>/check', methods=['POST'])
@jwt_required()
def check_answer(lesson_id):
    from flask import request
    data = request.get_json()
    question_id = data.get('question_id')
    answer = data.get('answer')

    question = Question.query.get_or_404(question_id)
    correct = question.correct == answer

    return jsonify({'correct': correct}), 200