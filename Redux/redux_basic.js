import { createStore } from 'redux'

const store = createStore((state = {count: 0 },action)=>{
    switch (action.type) {
        case 'INC':
            const increment = typeof action.incby == 'number'?action.incby : 1
            return{
                count: state.count + increment
            };
        case 'DEC':
            const decrement = typeof action.decby == 'number'?action.decby : 1
            return{
                count: state.count - decrement
            };
        case 'RES':
            return{
                count: 0
            };
        default:
            break;
    }
})

store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch({
    type:'INC'
});


store.dispatch({
    type:'DEC',
    decby:5
});

store.dispatch({
    type:'INC',
    incby:10
});


store.dispatch({
    type:'RES'
});


