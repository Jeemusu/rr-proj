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


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// render app
ReactDOM.render(jsx, document.getElementById('app'));
