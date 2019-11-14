import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should set up default filter values', () => {

    const state = filtersReducer(undefined, { type: '@@INIT'});
    
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});


test('should set sortBy to amount', () => {

    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {

    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    };

    const state = filtersReducer(currentState, { type: 'SORT_BY_DATE'});
    
    expect(state.sortBy).toBe('date');
});


test('should set text filter to value', () => {

    const text = 'some value';

    const state = filtersReducer(undefined, { 
        text: text, 
        type: 'SET_TEXT_FILTER'
    });
    
    expect(state.text).toBe(text);
});

test('should set startDate filter to value', () => {

    const startDate = moment().startOf('month').add(2,'days');

    const state = filtersReducer(undefined, { 
        startDate: startDate, 
        type: 'SET_START_DATE'
    });
    
    expect(state.startDate).toBe(startDate);
});


test('should set endDate filter to value', () => {

    const endDate = moment().startOf('month').add(5,'days');
    
    const state = filtersReducer(undefined, { 
        endDate: endDate, 
        type: 'SET_END_DATE'
    });
    
    expect(state.endDate).toBe(endDate);
});