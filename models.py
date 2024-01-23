from app import db

class FlowElement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(80))
    content = db.Column(db.String(200))
    condition = db.Column(db.String(200))

    def serialize(self):
        return {
            'id': self.id,
            'type': self.type,
            'content': self.content,
            'condition': self.condition
        }

class Prompt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.String(500))

    # Add serialize method

class Variable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    value = db.Column(db.String(200))

    # Add serialize method
