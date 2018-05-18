import React,{Component} from 'react';
import {fetchProfile, fetchQuiz, submitQuiz} from './../actions/index';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Redirect} from 'react-router-dom';

import _ from 'lodash';

class QuizContent extends Component {
  // For auth population and quiz meta data
  componentDidMount() {
    const token = sessionStorage.getItem('x-auth');
    if(!token) { return }
    // if(!this.props.profile.data.quiz) {
    //   this.props.fetchProfile(token, () => {
    //     const quizMetaData = this.props.profile.data.quiz;
    //     this.props.fetchQuiz(token, quizMetaData._id);
    //   });
    // }
    // console.log(this.props.profile.data);
    // if(_.isEmpty(this.props.profile.data)) {
    //   const token = sessionStorage.getItem('x-auth');
    //   if(!token) { return }
    //   const boundFunction = this.fetchQuizData.bind(this);
    //   this.props.fetchProfile(token, boundFunction(token));
    // }
    if(_.isEmpty(this.props.profile.data)) {
      var quizContentComponent = this;
      this.props.fetchProfile(token)
      .then((action) => {
        const quizId = action.payload.data.quiz._id;
        this.props.fetchQuiz(token, quizId);
      }).catch((err) => {
        console.log(err);
      })
      return;
    }
    const quizId = this.props.profile.data.quiz._id;
    this.props.fetchQuiz(token, quizId);
    return;
  }

  renderChoice(question, questionIndex) {
    return _.map(question.choices, (choice, choiceIndex) => {
      return (
        <div className='question-choice' key={choice}>
          <Field name={`Question-${questionIndex}`}
          className="choice-button"
          component="input"
          type="radio"
          value={`${choiceIndex}`}/> {choice}
        </div>
      );
    });
  }

  renderQuestions() {
    const quiz = this.props.quiz.data;
    return _.map(quiz.questions, (question, index) => {
      return (
        <div key={question._id}>
          <div className='question-title'>{question.title}</div>
          <div className='question-choices'>
            {this.renderChoice(question, index)}
          </div>
        </div>
      );
    });
  }

  renderQuiz() {
    const { handleSubmit } = this.props;

    return (
      <div className='sub-container-quiz'>
        <div className='full-width'>
          <div className='header'> Quiz </div>
        </div>
        <div className='full-width'>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            { this.renderQuestions() }
            <div className='sub-container-btn'>
              <button type="submit" className="btn-custom">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  render() {
    if(!sessionStorage.getItem('x-auth')) {
      return (
        <Redirect to="/login"/>
      );
    }

    // console.log(this.props.profile.data);
    if(_.isEmpty(this.props.profile.data)) {
      return(<div> Loading... </div>);
    }

    if(_.isEmpty(this.props.quiz.data)) {
      return(<div> Loading... </div>);
    }
    // Case when not authenticated and quiz is empty
    // if(_.isEmpty(this.props.quiz.data) &&
    // !this.props.quiz.isAuthenticated) {
    //   return (<div> Loading... </div>);
    // }
    //
    // // Case when not authenticated and quiz is not empty(with error)
    // if(!_.isEmpty(this.props.quiz.data) &&
    // !this.props.quiz.isAuthenticated) {
    //   return (<div> 401 Access Unauthorized </div>);
    // }
    // Correct access
    return this.renderQuiz();
  }

  onSubmit(values) {

    const token = sessionStorage.getItem('x-auth');
    var body = { _id: this.props.quiz.data._id, answers: [] };
    for (var key in values) {
      body.answers = body.answers.concat([values[key]]);
    }

    this.props.submitQuiz(token, body)
    .then((data) => {
      console.log(data);
      this.props.history.push("/thankyou");
    }).catch((e) => {
      console.log(`Error submitting quiz ${e}`);
    });
  }
}

function validate() {
  var errors = {};
  return errors;
}

function mapStateToProps({profile, quiz}) {
  return {profile, quiz};
}

export default reduxForm({
  validate,
  form: "QuizAnswersForm"
})(connect(mapStateToProps, {fetchProfile, fetchQuiz, submitQuiz})(QuizContent));
