import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import { addExpense } from '../../actions/expenses';
import Headers from '../Header/Header'


const AddExpensePage = (props) =>{
    return(
        <div>
            <Headers/>
            <h2>Add Expense</h2>

            <ExpenseForm
                onSubmit={(expense)=>{
                    props.dispatch(addExpense(expense));
                    props.history.push('/');     //When router is ready use it,every back press will go to /
                }}
            />
        </div>  
    )
}

export default connect()(AddExpensePage);