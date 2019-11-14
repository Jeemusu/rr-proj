import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);

    expect(wrapper).toMatchSnapshot();
});

test('should register error for invalid submission', () => {
    
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('errors')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
});

test('should render error message for invalid submission', () => {
    
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('errorMsg').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});


test('should set description on input change', () => {
    
    const value = 'new description';
    const wrapper = shallow(<ExpenseForm />);
    
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });

    expect(wrapper.state('description')).toBe(value);

});

test('should set note on textarea change', () => {
    
    const value = 'new note';
    const wrapper = shallow(<ExpenseForm />);
    
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });

    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
    
    const value = '12.50';
    const wrapper = shallow(<ExpenseForm />);
    
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });

    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    
    const value = '12.132';
    const wrapper = shallow(<ExpenseForm />);
    
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });

    expect(wrapper.state('amount')).not.toBe(value);
});

test('should call onSubmit prop for valid form input', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error')).not.toBeTruthy();
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const now = moment();

    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);

    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set focused on focus change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused: focused});

    expect(wrapper.state('isFocused')).toEqual(focused);
});