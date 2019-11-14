import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { removeExpense, editExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        //this.props.dispatch(editExpense(props.expense.id, expense));

        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemove = () => {
        //props.dispatch(removeExpense(props.expense.id));
        
        this.props.removeExpense(this.props.expense.id);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h1>Edit Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                    expense={this.props.expense}
                />
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    }

}

// Use the react-redux connect method to map state to props
// so we don't need to pass them down through all the components
const mapStateToProps = (state, props) => {
    return   {
        expense: state.expenses.find((expense) => {
            // return expense if it has same id as url
            return expense.id === props.match.params.id;
        })
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        editExpense: (id, expense) => dispatch(editExpense(id, expense)),
        removeExpense: (id) => dispatch(removeExpense(id))

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);