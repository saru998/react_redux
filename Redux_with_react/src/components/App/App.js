import React, { Component } from 'react';
import ExpenseDashboard from '../ExpenseDashboard/ExpenseDashboard'
import AddExpensePage from '../AddExpensePage/AddExpensePage'
import EditExpensePage from '../AddExpensePage/EditExpensePage'


import { BrowserRouter,Route,Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>        
        <BrowserRouter>
            <Switch>
              <Route path="/" component={ExpenseDashboard} exact={true}/>
              <Route path="/add" component={AddExpensePage} />
              <Route path="/edit/:id" component={EditExpensePage} />
            </Switch>
         </BrowserRouter>
      </div>
    );
  }
}

export default App;
