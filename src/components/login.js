import React,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from "react-router-dom";
import { Redirect } from 'react-router-dom';

import {connect} from "react-redux";
import {signup, login, SIGN_UP, LOGIN} from './../actions/index';

import validator from 'email-validator';
import _ from 'lodash';

class Login extends Component {
  onSubmit(values) {
    switch(values.button) {
      case 'signup':
        this.props.signup(values.email, values.password, (token) => {
          sessionStorage.setItem('x-auth', token);
        });
        return;
      case 'login':
        this.props.login(values.email, values.password, (token) => {
          sessionStorage.setItem('x-auth', token);
        });
        return;
      default:
    }
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input className="form-control"
          placeholder={field.placeholder}
          type={field.type} {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  render() {
    // Redirect to profile in case already logged in
    const token = sessionStorage.getItem('x-auth');
    if(token) {
      return <Redirect to="/profile"/>;
    }

    const {handleSubmit} = this.props;

    // Show error message in case there is an error with user data fetched
    const actionError = this.props.user.error;
    const actionTaken = this.props.user.action;

    return(
      <div className="container">
          <Field
            name="email"
            type="text"
            placeholder="Email..."
            component={this.renderField}/>
          <Field
            name="password"
            type="password"
            placeholder="Password..."
            component={this.renderField}/>
          <button className="btn btn-primary signup" onClick={handleSubmit(values =>
            this.onSubmit({
              ...values,
              button: 'signup'
            }))}>Sign Up</button>
          <button className="btn btn-primary login" onClick={handleSubmit(values =>
            this.onSubmit({
              ...values,
              button: 'login'
            }))}>Login</button>
          <div className="text-help spaced">
            {this.props.user.error ? `*Error with ${actionTaken} - Check credentials` : ``}
          </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.email || !validator.validate(values.email)) {
    errors.email = "*Please enter a valid email";
  }

  if(!values.password || values.password.length < 6) {
    errors.password = "*Please enter a valid password (6+ characters)";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps({user}) {
  return {user};
}

export default reduxForm({
  validate,
  form: "LoginForm"
})(connect(mapStateToProps, {signup, login})(Login));
