import React, { Component } from 'react';
import './App.css';
import Expenses from './components/expenses';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firestoreConnect,
  firebaseConnect,
  isLoaded
} from 'react-redux-firebase';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Update from './components/update';
import login from './components/login';

class App extends Component {
  state = {
    totalexpenses: null
  };

  static getDerivedStateFromProps(props) {
    const { expenses } = props;

    if (isLoaded(expenses)) {
      const total = expenses.reduce((total, expenses) => {
        return total + Number(expenses.amount);
      }, 0);

      return { totalexpenses: total };
    } else {
      return null;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="row bg-success">
            <nav className="navbar navbar-dark px-5 w-100">
              <a className="navbar-brand" href="#!">
                <i className="fas fa-hand-holding-usd" /> Xpense Tracker
              </a>
              {this.state.totalexpenses ? (
                <h6 className="text-light mb-0">
                  TOTAL EXPENSES &nbsp;{' '}
                  <i className="fas fa-rupee-sign text-light" />{' '}
                  {this.state.totalexpenses}
                </h6>
              ) : null}
            </nav>
          </div>

          <Switch>
            <Route exact path="/" component={Expenses} />} />
            <Route exact path="/update/:id" component={Update} />
            <Route exact path="/login" component={login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapstatetoprops = state => ({
  expenses: state.firestore.ordered.expenses
  // profile: state.firebase.profile // load profile
});

export default compose(
  firestoreConnect([
    'expenses' // { path: '/todos' } // object notation
  ]),
  firebaseConnect(),
  connect(mapstatetoprops)
)(App);
