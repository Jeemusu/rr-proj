// import third party librarys
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import 'react-dates/initialize';
import moment from 'moment';

// import styles
import 'normalize.css/normalize.css'; 
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

// import redux store
import configureStore from './store/configureStore.js';

// import actions and selectors
import { addExpense} from './actions/expenses.js';
import getVisibleExpenses from './selectors/expenses.js';

const store = configureStore();

/*
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});
*/

const expense1 = store.dispatch(addExpense({
    description: 'Gas Bill', 
    amount: 450,
    createdAt: moment().add('days', 1).valueOf()
}));

const expense2 = store.dispatch(addExpense({
    description: 'Water Bill', 
    amount: 520,
    createdAt: moment().valueOf()
}));

const expense3 = store.dispatch(addExpense({
    description: 'Electricity Bill', 
    amount: 330,
    createdAt: moment().add('days', 2).valueOf()
}));

const expense4 = store.dispatch(addExpense({
    description: 'Phone Bill', 
    amount: 420,
    createdAt: moment().add('days', 3).valueOf()
}));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// render app
ReactDOM.render(jsx, document.getElementById('app'));
