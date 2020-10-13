import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import './SignupForm.css';

class SignupForm extends Component {
  state = {
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    primInst: '',
    secInsts: [{ instrument: '' }],
  };

  handleChange = (e) => {
    if (['instrument'].includes(e.target.className)) {
      let secInsts = [...this.state.secInsts];
      secInsts[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ secInsts }, () => console.log(this.state.secInsts));
    } else {
      this.props.updateMessage('');
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  addInst = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      secInsts: [...prevState.secInsts, { instrument: '' }],
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push('/');
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  };

  isFormInvalid() {
    return !(
      this.state.first &&
      this.state.last &&
      this.state.email &&
      this.state.username &&
      this.state.primInst &&
      this.state.password === this.state.passwordConf
    );
  }

  render() {
    return (
      <div>
        <header className="header-footer">Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={this.state.first}
                name="first"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={this.state.last}
                name="last"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={this.state.username}
                name="username"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={this.state.passwordConf}
                name="passwordConf"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Primary Instrument"
                value={this.state.primInst}
                name="primInst"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              {this.state.secInsts.map((val, idx) => {
                let instId = `inst-${idx}`;
                return (
                  <div key={idx}>
                    <input
                      type="text"
                      name={instId}
                      data-id={idx}
                      id={instId}
                      className="instrument"
                      placeholder="Aditional Instrument"
                      value={this.state.secInsts[idx].instrument}
                      onChange={this.handleChange}
                    />
                  </div>
                );
              })}
              <button className="inst btn btn-default" onClick={this.addInst}>
                Add Another Instrument
              </button>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button
                className="btn btn-default"
                disabled={this.isFormInvalid()}
              >
                Sign Up
              </button>
              &nbsp;&nbsp;
              <Link to="/">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
