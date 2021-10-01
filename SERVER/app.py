from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

# INITALIZE APP
app = Flask(__name__)

# LET SERVER KNOW WHERE TO LOCATE DATABASE
basedir = os.path.abspath(os.path.dirname(__file__))

# SET UP DATABASE SQLITE
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
#     os.path.join(basedir, 'db.sqlite')

# SET UP DATABASE POSTGRESQL
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

# STOP CONSOLE COMPLAINTS
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# INITALIZE DB
db = SQLAlchemy(app)

# INITALIZE MARSHMALLOW
ma = Marshmallow(app)

# INIT CLASS / MODEL


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    todo = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    def __init__(self, todo, completed):
        self.todo = todo
        self.completed = completed


# SCHEMA


class TodoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'todo', 'completed')


# INIT SCHEMA(S)
todo_schema = TodoSchema()
todos_schema = TodoSchema(many=True)

# CREATE ONE


@app.route('/todo', methods=['POST'])
def add_todo():
    todo = request.json['todo']
    completed = request.json['completed']

    new_todo = Todo(todo, completed)

    db.session.add(new_todo)
    db.session.commit()

    return todo_schema.jsonify(new_todo)

# GET ALL


@app.route('/todo', methods=['GET'])
def get_todos():
    all_todos = Todo.query.all()
    result = todos_schema.dump(all_todos)
    return jsonify(result)

# GET ONE


@app.route('/todo/<id>', methods=['GET'])
def get_todo(id):
    todo = Todo.query.get(id)
    return todo_schema.jsonify(todo)


# UPDATE ONE


@app.route('/todo/<id>', methods=['PUT'])
def update_todo(id):
    todo = Todo.query.get(id)

    todo_value = request.json['todo']
    completed_value = request.json['completed']

    todo.todo = todo_value
    todo.completed = completed_value

    db.session.commit()

    return todo_schema.jsonify(todo)
# DELETE ONE


@app.route('/todo/<id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get(id)
    db.session.delete(todo)
    db.session.commit()
    return todo_schema.jsonify(todo)

# CREATE BASIC ROUTE

# @app.route('/', methods=['DELETE'])
# def get():
#     return 'TEST'


# RUN SERVER
if __name__ == '__main__':
    app.run(debug=True)
