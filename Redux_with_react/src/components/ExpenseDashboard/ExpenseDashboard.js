import React, { Component } from 'react';
import ExpenseList from '../ExpenseList/ExpenseList'
import ExpenseListFilter from '../ExpenseListFilters/ExpenseListFilters'
import Headers from '../Header/Header'

const ExpenseDashboard = () =>{
    return(
        <div>
            <Headers/>
            <h2>ExpenseDashboard</h2>
            
            <ExpenseListFilter/>
            <ExpenseList/>
        </div>
    )  
};

export default ExpenseDashboard;