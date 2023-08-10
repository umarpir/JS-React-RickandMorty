import { useState } from 'react';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
    const {name, status,id, species} = props

    return (
       
        <div className="expense-item">
            <div>
            <div> {id}</div>
            </div>
            <div className="expense-item__description">
                <h2>{name}</h2>
                <div className="expense-item__price">{status}</div>
                <div className="expense-item__price">{species}</div>
            </div>
        </div>
        
    )
}
export default ExpenseItem;