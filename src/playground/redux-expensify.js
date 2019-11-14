import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = (
    {
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description: description,
        note: note,
        amount: amount,
        createdAt: createdAt
    }
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    updates: updates
});

const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text: text
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate: startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate: endDate
});


// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ... state, 
                action.expense
            ];
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id == action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                return expense;
            });
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        default:
            return state;
    }
};


// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SORT_BY_DATE':
                return {
                    ...state,
                    sortBy: 'date'
                }
        case 'SORT_BY_AMOUNT':
                return {
                    ...state,
                    sortBy: 'amount'
                }
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

const sortArrayBy = (sortBy) => {

}

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || startDate <= expense.createdAt;
        const endDateMatch = typeof endDate !== 'number' || endDate >= expense.createdAt;
        const textMatch = text == '' ? true : expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

// Store
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);


// Subscribe to state changes
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});


store.dispatch(setStartDate(new Date().getTime()));


// Dispatches
const expense1 = store.dispatch(addExpense({
    description: 'Expense 1', 
    amount: 400,
    createdAt: new Date().getTime() + 10000
}));

const expense2 = store.dispatch(addExpense({
    description: 'Expense 2', 
    amount: 500,
    createdAt: new Date().getTime() + 20000
}));

const expense3 = store.dispatch(addExpense({
    description: 'Expense 3', 
    amount: 100,
    createdAt: new Date().getTime() + 30000
}));

//store.dispatch(setTextFilter('expense 2'));

store.dispatch(sortByAmount());

/*
store.dispatch(removeExpense(expense1.expense.id));

store.dispatch(editExpense(expense2.expense.id, {
    description: 'Expense 2 - UPDATED',
}));

store.dispatch(setTextFilter('a value'));

store.dispatch(sortByDate());
store.dispatch(sortByAmount());

store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
store.dispatch(setEndDate(234));
*/

