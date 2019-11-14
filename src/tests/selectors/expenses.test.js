import getVisibleExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('should filter by text value', () => {

    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }

    const action = getVisibleExpenses(expenses, filters);
    
    expect(action).toEqual([
        expenses[2], expenses[0]
        
    ]);
});

test('should sort by date value', () => {

    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }

    const action = getVisibleExpenses(expenses, filters);
    
    expect(action).toEqual([
        expenses[2], expenses[1], expenses[0]
        
    ]);
});

test('should sort by amount value', () => {

    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }

    const action = getVisibleExpenses(expenses, filters);
    
    expect(action).toEqual([
        expenses[1], expenses[0], expenses[2]
        
    ]);
});

test('should filter by start date', () => {

    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0).add(12, 'days'),
        endDate: undefined
    }

    const action = getVisibleExpenses(expenses, filters);
    
    expect(action).toEqual([
        expenses[2]
    ]);
});

test('should filter by end date', () => {

    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(12, 'days')
    }

    const action = getVisibleExpenses(expenses, filters);
    
    expect(action).toEqual([
        expenses[1],
        expenses[0]
    ]);
});
