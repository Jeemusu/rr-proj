import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({ id, description, amount, createdAt}) => {
    return (
        <li>
            <Link to={`/edit/${id}`}>
                <h3>{description}</h3>
            </Link>
            <p>{amount} - {moment(createdAt).format('MMM D, YYYY')}</p>
            
        </li>
    );
};

// Don't need anything from the state
export default ExpenseListItem;