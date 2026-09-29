from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    scenario_key = db.Column(db.String(50), unique=True, nullable=False, default='scenario_1')
    persona_name = db.Column(db.String(100), nullable=False)
    role_title = db.Column(db.String(150))
    monthly_income = db.Column(db.Float, default=5000.0)
    currency = db.Column(db.String(10), default='$')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    incomes = db.relationship('Income', backref='user', lazy=True, cascade='all, delete-orphan')
    expenses = db.relationship('Expense', backref='user', lazy=True, cascade='all, delete-orphan')
    budgets = db.relationship('Budget', backref='user', lazy=True, cascade='all, delete-orphan')
    goals = db.relationship('SavingsGoal', backref='user', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'scenarioKey': self.scenario_key,
            'personaName': self.persona_name,
            'roleTitle': self.role_title,
            'monthlyIncome': self.monthly_income,
            'currency': self.currency,
            'createdAt': self.created_at.isoformat()
        }

class Income(db.Model):
    __tablename__ = 'incomes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    income_type = db.Column(db.String(50), default='Salary')
    date = db.Column(db.String(30), nullable=False)
    status = db.Column(db.String(50), default='Received')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'amount': self.amount,
            'type': self.income_type,
            'date': self.date,
            'status': self.status
        }

class Expense(db.Model):
    __tablename__ = 'expenses'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    payment_method = db.Column(db.String(50), default='Credit Card')
    date = db.Column(db.String(30), nullable=False)
    notes = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'amount': self.amount,
            'category': self.category,
            'paymentMethod': self.payment_method,
            'date': self.date,
            'notes': self.notes
        }

class Budget(db.Model):
    __tablename__ = 'budgets'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    limit_amount = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'category': self.category,
            'limitAmount': self.limit_amount
        }

class SavingsGoal(db.Model):
    __tablename__ = 'savings_goals'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    current_saved = db.Column(db.Float, default=0.0)
    deadline = db.Column(db.String(30))
    category = db.Column(db.String(50), default='Emergency')
    monthly_contribution = db.Column(db.Float, default=200.0)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'target': self.target_amount,
            'current': self.current_saved,
            'deadline': self.deadline,
            'category': self.category,
            'monthlyContribution': self.monthly_contribution
        }

