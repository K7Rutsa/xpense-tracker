import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firestoreConnect,
  isLoaded,
  isEmpty,
  firebaseConnect
} from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Loader from './loader';

class Expenses extends Component {
  state = {
    item: '',
    amount: '',
    uid: ''
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate() {
    if (this.state.uid === '') {
      this.setState({
        uid: this.props.auth.uid
      });
    }
  }

  addexpense = e => {
    e.preventDefault();

    const { item, amount } = this.state;

    const { firestore } = this.props;

    firestore.add({ collection: 'expenses' }, { item, amount }).then(() => {
      this.setState({
        item: '',
        amount: ''
      });
    });
  };

  delete = id => {
    const { firestore } = this.props;

    firestore.delete({ collection: 'expenses', doc: id });
  };

  render() {
    const { expenses } = this.props;

    const expense = !isLoaded(expenses) ? (
      <h6 className="text-center">
        <Loader />
      </h6>
    ) : isEmpty(expenses) ? (
      <h6 className="text-center display-5">N0 XPENSES</h6>
    ) : (
      expenses.map(d => {
        return (
          <li
            className="list-group-item d-flex justify-content-between"
            key={d.id}
          >
            <span className="text-dark">
              <Link to={`/update/${d.id}`}>
                <i
                  className="fas fa-pencil-alt text-warning"
                  style={{ cursor: 'pointer' }}
                />
              </Link>
              &nbsp; {d.item.toUpperCase()}{' '}
            </span>

            <span>
              <i className="fas fa-rupee-sign text-success">
                {' '}
                {d.amount}{' '}
                <i
                  className="fas fa-trash-alt text-danger ml-2"
                  onClick={() => this.delete(d.id)}
                  style={{ cursor: 'pointer' }}
                />
              </i>
            </span>
          </li>
        );
      })
    );

    return (
      <div className="home">
        <div className="container-fluid">
          <form className="form mt-5" onSubmit={this.addexpense}>
            <div className="form-row justify-content-center">
              <div className="form-group col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item"
                  minLength="3"
                  name="item"
                  value={this.state.item.toUpperCase()}
                  onChange={this.change}
                  required
                />
              </div>{' '}
              &nbsp;
              <div className="form-group col-md-1">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.change}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary align-self-start col-md-1"
              >
                Add
              </button>
            </div>
          </form>

          <div className="row mt-4">
            <div className="col-md-6 offset-md-3">
              <ul className="list-group">{expense}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapstatetoprops = state => ({
  expenses: state.firestore.ordered.expenses,
  auth: state.firebase.auth,
  data: state.firestore.ordered
  // profile: state.firebase.profile // load profile
});

export default compose(
  firestoreConnect(props => [
    {
      collection: 'users'
    }
  ]),
  firebaseConnect(),
  connect(mapstatetoprops)
)(Expenses);
