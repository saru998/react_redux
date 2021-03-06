import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeExpense } from '../../actions/expenses'

const ExpenseListItem = ({ dispatch,id,des, amount, createAt }) => {
    return (
        <div>
            <span>{des}</span> 
            <span>amount {amount}</span>
            <button onClick={()=>{
                dispatch(removeExpense({id:id}))
            }}>Remove</button>
            <button>
                <Link to={`/edit/${id}`}>
                    edit
                </Link>
            </button>
        </div>
    )
}

export default connect()(ExpenseListItem);