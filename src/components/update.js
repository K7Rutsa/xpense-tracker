import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class update extends Component {
  constructor(props) {
    super(props);
    this.amountRef = React.createRef();
    this.itemRef = React.createRef();
  }

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  update = e => {
    e.preventDefault();

    const { firestore } = this.props;

    firestore
      .update(
        { collection: 'expenses', doc: this.props.expenses.id },
        {
          item: this.itemRef.current.value,
          amount: this.amountRef.current.value
        }
      )
      .then(() => {
        this.props.history.push('/');
      });
  };

  render() {
    return (
      <form className="form mt-5" onSubmit={this.update}>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Items"
              minLength="3"
              name="item"
              ref={this.itemRef}
              defaultValue={
                isLoaded(this.props.expenses)
                  ? this.props.expenses.item.toUpperCase()
                  : ''
              }
              // onChange={this.change}
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
              defaultValue={
                isLoaded(this.props.expenses) ? this.props.expenses.amount : ''
              }
              // onChange={this.change}
              ref={this.amountRef}
              required
            />
          </div>
          <button type="submit" className="btn btn-success align-self-start">
            Update
          </button>{' '}
          &nbsp;
          <Link to="/" className="btn btn-primary align-self-start">
            {' '}
            Cancel{' '}
          </Link>
        </div>
      </form>
    );
  }
}

const mapstatetoprops = state => ({
  expenses:
    state.firestore.ordered.expense && state.firestore.ordered.expense[0]
});

export default compose(
  firestoreConnect(props => [
    { collection: 'expenses', storeAs: 'expense', doc: props.match.params.id }
  ]),
  connect(mapstatetoprops)
)(update);
