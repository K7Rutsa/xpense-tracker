import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase
      .login({ email, password })
      .then(() => {
        this.props.history.push('/');
      })
      .catch(error => console.log(error.message));
  };

  logingoogle = () => {
    const { firebase, history } = this.props;
    firebase
      .login({ provider: 'google', type: 'popup' })
      .then(() => history.push('/'));
  };

  logoutgoogle = () => {
    const { firebase, history } = this.props;
    firebase.logout().then(() => history.push('/'));
  };

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <form className="col-6 offset-3 mt-5" onSubmit={this.login}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder=""
              name="email"
              defaultValue={this.state.email}
              onChange={this.change}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              placeholder=""
              defaultValue={this.state.password}
              onChange={this.change}
            />
          </div>

          <button type="submit" className="btn btn-primary d-block">
            Login
          </button>
        </form>
        <button className="btn btn-sm btn-primary" onClick={this.logingoogle}>
          Login with google
        </button>
        <button className="btn btn-sm btn-primary" onClick={this.logoutgoogle}>
          Logout
        </button>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(Login);
