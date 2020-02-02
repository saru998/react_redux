import { createStore } from 'redux'

const incrementCount = ({incrementBy = 1}={}) =>({
    type:'INC',
    incrementBy
});
const decrementCount = ({decrementBy = 1}={}) =>({
    type:'DEC',
    decrementBy
});
const store = createStore((state = {count: 0 },action)=>{
    switch (action.type) {
        case 'INC':
            return{
                count: state.count + action.incrementBy
            };
        case 'DEC':
            return{
                count: state.count - action.decrementBy
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
    console.log("subscribe",store.getState());
})

store.dispatch(incrementCount())
store.dispatch(decrementCount())
store.dispatch(incrementCount({incrementBy:5}))
store.dispatch(decrementCount({incrementBy:5}))


