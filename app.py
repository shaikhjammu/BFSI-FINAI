import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, User, Income, Expense, Budget, SavingsGoal

app = Flask(__name__)
CORS(app)

# SQLite Database setup
db_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'finai.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

def seed_initial_data():
    if User.query.first():
        return  # Already seeded

    # Scenario 1: Salaried Pro
    user1 = User(scenario_key='scenario_1', persona_name='Alex Morgan', role_title='Senior Software Engineer', monthly_income=6500.0, currency='$')
    db.session.add(user1)
    db.session.flush()

    db.session.add_all([
        Income(user_id=user1.id, title='Tech Corp Salary', amount=5800.0, income_type='Monthly Fixed', date='2026-09-01', status='Received'),
        Income(user_id=user1.id, title='Performance Bonus', amount=700.0, income_type='Bonus', date='2026-09-15', status='Received'),
        Expense(user_id=user1.id, title='Apartment Rent', amount=1850.0, category='housing', date='2026-09-02'),
        Expense(user_id=user1.id, title='Supermarket Groceries', amount=550.0, category='groceries', date='2026-09-05'),
        Expense(user_id=user1.id, title='Weekend Dinners', amount=480.0, category='dining', date='2026-09-08'),
        Expense(user_id=user1.id, title='Car Lease & Fuel', amount=460.0, category='transport', date='2026-09-10'),
        Budget(user_id=user1.id, category='housing', limit_amount=1900.0),
        Budget(user_id=user1.id, category='groceries', limit_amount=600.0),
        Budget(user_id=user1.id, category='dining', limit_amount=400.0),
        SavingsGoal(user_id=user1.id, title='House Down Payment', target_amount=60000.0, current_saved=24500.0, category='Property', monthly_contribution=800.0)
    ])

    # Scenario 2: College Student
    user2 = User(scenario_key='scenario_2', persona_name='Maya Chen', role_title='CS Junior', monthly_income=850.0, currency='$')
    db.session.add(user2)
    db.session.flush()

    db.session.add_all([
        Income(user_id=user2.id, title='Parents Allowance', amount=500.0, income_type='Allowance', date='2026-09-01', status='Received'),
        Income(user_id=user2.id, title='Campus Work-Study', amount=350.0, income_type='Part-time Wage', date='2026-09-15', status='Received'),
        Expense(user_id=user2.id, title='Campus Meal Plan', amount=240.0, category='groceries', date='2026-09-03'),
        Expense(user_id=user2.id, title='Textbooks', amount=110.0, category='education', date='2026-09-09'),
        SavingsGoal(user_id=user2.id, title='MacBook for Projects', target_amount=1200.0, current_saved=750.0, category='Tech', monthly_contribution=75.0)
    ])

    db.session.commit()
    print("Database seeded successfully with initial scenarios!")

with app.app_context():
    db.create_all()
    seed_initial_data()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'FinAI Financial Advisor Flask Engine',
        'version': '2.0.0'
    })

@app.route('/api/scenarios/<scenario_key>', methods=['GET'])
def get_scenario(scenario_key):
    user = User.query.filter_by(scenario_key=scenario_key).first()
    if not user:
        return jsonify({'error': 'Scenario not found'}), 404
    
    incomes = [i.to_dict() for i in user.incomes]
    expenses = [e.to_dict() for e in user.expenses]
    budgets = {b.category: b.limit_amount for b in user.budgets}
    goals = [g.to_dict() for g in user.goals]

    return jsonify({
        'user': user.to_dict(),
        'incomes': incomes,
        'expenses': expenses,
        'budgets': budgets,
        'savingsGoals': goals
    })

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.json
    expense = Expense(
        user_id=data.get('userId', 1),
        title=data.get('title'),
        amount=float(data.get('amount', 0)),
        category=data.get('category', 'misc'),
        payment_method=data.get('paymentMethod', 'Credit Card'),
        date=data.get('date'),
        notes=data.get('notes', '')
    )
    db.session.add(expense)
    db.session.commit()
    return jsonify(expense.to_dict()), 201

@app.route('/api/incomes', methods=['POST'])
def add_income():
    data = request.json
    income = Income(
        user_id=data.get('userId', 1),
        title=data.get('title'),
        amount=float(data.get('amount', 0)),
        income_type=data.get('type', 'Salary'),
        date=data.get('date'),
        status=data.get('status', 'Received')
    )
    db.session.add(income)
    db.session.commit()
    return jsonify(income.to_dict()), 201

@app.route('/api/ai/analyze', methods=['POST'])
def ai_analyze():
    data = request.json
    income = float(data.get('income', 5000))
    expenses = data.get('expenses', [])
    total_expense = sum(float(e.get('amount', 0)) for e in expenses)
    net_savings = max(0.0, income - total_expense)
    savings_rate = (net_savings / income * 100) if income > 0 else 0

    # 50/30/20 breakdown
    needs_budget = income * 0.50
    wants_budget = income * 0.30
    savings_budget = income * 0.20

    return jsonify({
        'totalIncome': income,
        'totalExpense': total_expense,
        'netSavings': net_savings,
        'savingsRate': round(savings_rate, 1),
        'recommendedPlan': {
            'needs': needs_budget,
            'wants': wants_budget,
            'savings': savings_budget
        },
        'status': 'success'
    })

if __name__ == '__main__':
    print("Starting FinAI Flask REST server on port 5000...")
    app.run(port=5000, debug=False)
