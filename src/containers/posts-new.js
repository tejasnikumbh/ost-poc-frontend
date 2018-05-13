import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from './../actions/index';


class PostsNew extends Component {

  renderField(field) {
    const {touched, error} = field.meta;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    console.log(field.input);
    return(
      <div className={className}>
        <label className="form-input-label">{field.label}</label>
        <input className="form-control" type="text" {...field.input}/>
        <div className="text-help">
         {touched ? error : "" }
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    })
  }

  render() {
    const {handleSubmit} = this.props;
    return(
      <div className="container">
        <h1 className="posts-header"> Create a new post </h1>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}/>
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}/>
          <Field
            label="Content"
            name="content"
            component={this.renderField}/>
          <button type="submit" className="btn btn-primary submit">Submit</button>
          <Link to="/" className="btn btn-danger cancel">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const error = {};
  if(!values.title) {
    error.title = "*Enter a title";
  }
  if(!values.categories) {
    error.categories = "*Enter some categories";
  }
  if(!values.content) {
    error.content = "*Enter the content";
  }
  return error;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(connect(null, {createPost})(PostsNew));
