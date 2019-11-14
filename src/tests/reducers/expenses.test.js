import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set up default expense values', () => {

    const state = expensesReducer(undefined, { type: '@@INIT'});
    
    expect(state).toEqual([]);
});

test('should remove an expense by id', () => {

    const state = expensesReducer(expenses, { 
        id: expenses[0].id,
        type: 'REMOVE_EXPENSE'
    });
    
    expect(state).toEqual([
        expenses[1],
        expenses[2]
    ]);
});

test('should not remove an expense if id not found', () => {

    const state = expensesReducer(expenses, { 
        id: 4,
        type: 'REMOVE_EXPENSE'
    });
    
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {

    const expense = {
        description: 'asd',
        amount: 10
    };

    const state = expensesReducer(expenses, { 
        expense: expense, 
        type: 'ADD_EXPENSE'
    });
    
    expect(state).toEqual([
        ...expenses,
        {
            description: 'asd',
            amount: 10
        }
    ]);
});

test('should edit an expense', () => {

    const description = 'Changed Expense Description'
    const state = expensesReducer(expenses, { 
        id: expenses[2].id,
        updates: {
            description: description
        }, 
        type: 'EDIT_EXPENSE'
    });
    
    expect(state[2].description).toBe(description);
});

test('should not edit an expense if expense not found', () => {

    const description = 'Changed Expense Description'
    const state = expensesReducer(expenses, { 
        id: 45,
        updates: {
            description: description
        }, 
        type: 'EDIT_EXPENSE'
    });
    
    expect(state).toEqual(expenses);
});