import { createStore,combineReducers } from 'redux'
import uuid from 'uuid'

//Reducers
//Expense reducer
const expensesReducerDefaultState=[]
const expenseReducer = (state = expensesReducerDefaultState,action)=>{
    switch (action.type){
        case 'ADD_EXPENSE':
            return [...state,action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter((x)=>{
                return x.id!==action.id?true:false
            })
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id===action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else return expense
            })
        default:
            return state;
    }
}
//Filter reducer
const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
};

const filterReducer =(state = filtersReducerDefaultState,action) =>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return{
                ...state,
                text:action.text
            }
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy:action.sortBy
            }
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy:action.sortBy
            }
        default:
            return state;
    }
};

//expense reducer actions
const addExpense =({des='',note='',amount=0,createdAt=0}={})=>({
    type:'ADD_EXPENSE',
    expense:{
        id:uuid(),
        des,
        note,
        amount,
        createdAt
    }
});
const removeExpense =({id}={})=>({
    type:'REMOVE_EXPENSE',
    id
});
const editExpense =(id,updates)=>({
    type:'EDIT_EXPENSE',
    id,
    updates
});

//Filter reducer actions
const addFilter = ({text=''}={})=>({
    type:'SET_TEXT_FILTER',
    text
})
const sortByAmount = ({sortBy=''}={})=>({
    type:'SORT_BY_AMOUNT',
    sortBy
})
const sortByDate = ({sortBy=''}={})=>({
    type:'SORT_BY_DATE',
    sortBy
})

const store = createStore(
    combineReducers({
        expenses:expenseReducer,
        filter:filterReducer
    })
)

const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate})=>{
    return expenses.filter((expense)=>{
        const textMatch = expense.des.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    }).sort((a,b)=>{
        if(sortBy==='date'){
            return a.createdAt < b.createdAt?-1:1;
        }else if(sortBy==='amount'){
            return a.amount<b.amount?-1:1;
        }
    })
}
store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filter);
    console.log(visibleExpenses)
})

//expense actions dispatch
const exp1 = store.dispatch(addExpense({des:'RENT',amount:1000,createdAt:12}))
const exp2 = store.dispatch(addExpense({des:'COFFEE',amount:800,createdAt:15}))

//store.dispatch(removeExpense({id:exp2.expense.id}))
//store.dispatch(editExpense(exp1.expense.id,{amount:111}))


//Filter actions dispatch
//store.dispatch(addFilter({text:'test_value'}))

store.dispatch(sortByDate({sortBy:'date'}))
store.dispatch(sortByAmount({sortBy:'amount'}))