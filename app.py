from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from models import FlowElement, Prompt, Variable

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flow.db'
db = SQLAlchemy(app)

@app.route('/api/flow_elements', methods=['GET', 'POST', 'PUT', 'DELETE'])
def handle_flow_elements():
    if request.method == 'GET':
        elements = FlowElement.query.all()
        return jsonify([e.serialize() for e in elements]), 200
    elif request.method == 'POST':
        data = request.json
        new_element = FlowElement(type=data['type'], content=data['content'], condition=data.get('condition'))
        db.session.add(new_element)
        db.session.commit()
        return jsonify(new_element.serialize()), 201
    elif request.method == 'PUT':
        data = request.json
        element = FlowElement.query.get(data['id'])
        if element:
            element.type = data['type']
            element.content = data['content']
            element.condition = data.get('condition')
            db.session.commit()
            return jsonify(element.serialize()), 200
        return jsonify({'error': 'Element not found'}), 404
    elif request.method == 'DELETE':
        id = request.args.get('id')
        element = FlowElement.query.get(id)
        if element:
            db.session.delete(element)
            db.session.commit()
            return jsonify({'status': 'success'}), 200
        return jsonify({'error': 'Element not found'}), 404

@app.route('/api/prompts', methods=['GET', 'POST', 'PUT', 'DELETE'])
def handle_prompts():
    # Similar CRUD operations for Prompts
    # ...

@app.route('/api/variables', methods=['GET', 'POST', 'PUT', 'DELETE'])
def handle_variables():
    # Similar CRUD operations for Variables
    # ...

@app.route('/api/process_input', methods=['POST'])
def process_input():
    user_input = request.json.get('input')
    # Processing logic based on user input and flow elements
    # ...

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
