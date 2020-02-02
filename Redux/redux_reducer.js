import { createStore,combineReducers } from 'redux'

const expensesReducerDefaultState=[]
const expenseReducer = (state = expensesReducerDefaultState,action)=>{
    switch (action.type){
        default:
            return state;
    }
}
const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
};

const filterReducer =(state = filtersReducerDefaultState,action) =>{
    switch(action.type){
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({
        expenses:expenseReducer,
        filter:filterReducer
    })
)

console.log(store.getState())