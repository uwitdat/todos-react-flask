from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
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
migrate = Migrate(app, db)

# INITALIZE MARSHMALLOW
ma = Marshmallow(app)

# INIT CLASS / MODEL


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    todo = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    date_added = db.Column(db.String(100), default='')

    def __init__(self, todo, completed, date_added):
        self.todo = todo
        self.completed = completed
        self.date_added = date_added


# SCHEMA


class TodoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'todo', 'completed', 'date_added')
        # ordered = True


# INIT SCHEMA(S)
todo_schema = TodoSchema()
todos_schema = TodoSchema(many=True)

# CREATE ONE


@app.route('/todo', methods=['POST'])
def add_todo():
    todo = request.json['todo']
    completed = request.json['completed']
    date_added = request.json['date_added']

    new_todo = Todo(todo, completed, date_added)

    db.session.add(new_todo)
    db.session.commit()

    return todo_schema.jsonify(new_todo)

# GET ALL


@app.route('/todo', methods=['GET'])
def get_todos():
    # all_todos = Todo.query.all().order_by(None)
    all_todos = Todo.query.filter().order_by('todo')
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


@app.route('/', methods=['GET'])
def get():
    return 'WELCOME TO MY FLASK SERVER'


# RUN SERVER
if __name__ == '__main__':
    app.run(debug=True)
