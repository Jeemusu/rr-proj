import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => {
    return (
        <div>
            {
                props.expenses.length === 0 ? (
                    <p>No Expenses</p>
                ) : (
                    <ul>
                    {
                        props.expenses.map((expense) => {
                            return <ExpenseListItem key={expense.id} {...expense} />
                        })
                    }
                    </ul>
                )
            }
        </div>
    );
};

// Use the react-redux connect method to map state to props
// so we don't need to pass them down through all the components
const mapStateToProps = (state) => {
    return   {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);