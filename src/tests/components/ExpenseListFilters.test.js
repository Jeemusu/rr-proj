import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, setFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters when filters are set', () => {
    wrapper.setProps({
        filters: setFilters
    })    
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const text = 'Two';
    wrapper.find('input').simulate('change', {
        target: {
            value: text
        }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(text);
});

test('should sort by date', () => {
    wrapper.setProps({
        filters: setFilters
    })    

    const sort = 'date';
    wrapper.find('select').simulate('change', {
        target: {
            value: sort
        }
    });

    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {

    const sort = 'amount';
    wrapper.find('select').simulate('change', {
        target: {
            value: sort
        }
    });

    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {

    const startDate = moment(0).add(4, 'months');
    const endDate = moment(0).add(10, 'months');

    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
        startDate, endDate
    });

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});


test('should handle date focus change', () => {

    const focusedInput = 'startDate';

    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focusedInput);

    expect(wrapper.state('focusedInput')).toBe(focusedInput);
});