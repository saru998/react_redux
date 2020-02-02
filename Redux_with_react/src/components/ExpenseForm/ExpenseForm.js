import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import {connect} from 'react-redux'
import selectExpnese from '../../selectors/expenses'


class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            des:props.expense?props.expense.des:'',
            note:props.expense?props.expense.note:'',
            amount:props.expense?props.expense.amount:'',
            createdAt:props.expense?moment(props.expense.createdAt):moment(),
            calendarFocused:false
        };
        this.onAmountChange=this.onAmountChange.bind(this)
        this.onDateChange=this.onDateChange.bind(this)
        this.onFocusChange=this.onFocusChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.onDescriptionChange=this.onDescriptionChange.bind(this)
        this.onNoteChange=this.onNoteChange.bind(this)
    };
    onDescriptionChange(e){
        const description = e.target.value;
        this.setState(()=>({ des:description}));
    };
    onNoteChange(e){
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange(e){
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(()=>({amount}));
        };
    }
    onDateChange(createdAt){
        if(createdAt){
            this.setState(()=>({ createdAt }));
        }
    }
    onFocusChange({focused}){
        //console.log(this.state.calendarFocused)
        this.setState(()=>({ calendarFocused:focused}));
    }
    onSubmit(e){
        e.preventDefault();

        if(!this.state.des || !this.state.amount){
            this.setState(()=>({ error:'please provide description and amount.'}));
        }else{
            this.setState(()=>{ error:''});
            this.props.onSubmit({
                des:this.state.des,
                amount:this.state.amount,
                createdAt:this.state.createdAt.valueOf(),
                note:this.state.note
            });
        }
    }
    render(){
            return(
                <div>
                    {this.state.error && <p>{this.state.error}</p>} 
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="Description"
                            autoFocus
                            value={this.state.des}
                            onChange={this.onDescriptionChange}
                        />
                        <input
                            type="text"
                            placeholder="Amount"
                            value={this.state.amount}
                            onChange={this.onAmountChange}
                        />
                        <SingleDatePicker
                            date={this.state.createdAt}
                            onDateChange={(params)=>this.onDateChange(params)}
                            focused={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={()=> false}

                        ></SingleDatePicker>
                        <textarea
                            placeholder="Add a note for your expense(optional)"
                            value={this.state.note}
                            onChange={this.onNoteChange}
                        >
                        </textarea>
                        <button>Add Expense</button>
                    </form>
                </div>
            )
    }
}
const mapStateToProps = (state,props) =>{
    return{
        expenses:selectExpnese(state.expenses,state.filter)
    };
};


export default connect(mapStateToProps)(ExpenseForm);