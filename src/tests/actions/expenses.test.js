import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense('123abc');
    
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', {
        description: 'This is a description.',
        amount: 1000,
    });
    
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            description: 'This is a description.',
            amount: 1000,
        }
    });
});

test('should setup add expense action object', () => {

    const expenseData = {
        description: 'This is a description.',
        amount: 1000,
        note: 'This is a note.',
        createdAt: 1000
    };

    const action = addExpense(expenseData);
    
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    });
});

test('should setup add expense action object with default values', () => {

    const action = addExpense({});
    
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            note: '',
            createdAt: 0
        }
    });
});