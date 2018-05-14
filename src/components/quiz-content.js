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

  renderQuestion(field) {
    return (
      <div className='question-title' key={field.question._id}>
        { field.question.title }
      </div>
    );
  }

  renderQuestions() {
    const quiz = this.props.quiz.data;
    return _.map(quiz.questions, question => {
      return (
        <Field
          question={question}
          name={question._id}
          key={question._id}
          component={this.renderQuestion}
        />
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

  onSubmit() {
    console.log('Submitted!');
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
