import React,{Component} from 'react';
import {fetchQuiz} from './../actions/index';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import _ from 'lodash';

class QuizContent extends Component {
  // For auth population and quiz meta data
  componentDidMount() {
    if(!this.props.quiz.isAuthenticated) {
      const token = sessionStorage.getItem('x-auth');
      this.props.fetchQuiz(token);
    }
  }

  renderChoice(question, questionIndex) {
    return _.map(question.choices, (choice, choiceIndex) => {
      return (
        <label key={choice}>
          <Field name={`Question-${questionIndex}`}
          component="input"
          type="radio"
          value={`${choiceIndex}`}/> {choice}
        </label>
      );
    });
  }

  renderQuestions() {
    const quiz = this.props.quiz.data;

    return _.map(quiz.questions, (question, index) => {
      return (
        <div key={question._id}>
          <label>{question.title}</label>
          <div>
            {this.renderChoice(question, index)}
          </div>
        </div>
      );
    });
  }

  renderQuiz() {
    const { handleSubmit } = this.props;

    return (
      <div className='container'>
        <div className='header'> Header </div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            { this.renderQuestions() }
          <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
    );
  }

  render() {
    // Case when fetching profile
    if(_.isEmpty(this.props.quiz.data) &&
    !this.props.quiz.isAuthenticated) {
      return (<div> Loading... </div>);
    }
    // Case when unauthorized access
    if(!_.isEmpty(this.props.quiz.data) &&
    !this.props.quiz.isAuthenticated) {
      return (<div> 401 Access Unauthorized </div>);
    }
    // Correct access
    return this.renderQuiz();
  }

  onSubmit(values) {
    console.log('Submitted!');
    console.log(values);
  }
}

function validate() {
  var errors = {};
  return errors;
}

function mapStateToProps({quiz}) {
  return {quiz};
}

export default reduxForm({
  validate,
  form: "QuizAnswersForm"
})(connect(mapStateToProps, {fetchQuiz})(QuizContent));
