import React,{Component} from 'react';
import {fetchProfile, fetchQuiz, submitQuiz} from './../actions/index';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Redirect} from 'react-router-dom';
import Modal from 'react-awesome-modal';

import _ from 'lodash';

class QuizContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        visible : false,
        shownOnce: false
    }
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false,
        shownOnce : true
    });
  }

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
        <Modal visible={this.state.visible}
        width="400" height="350"
        effect="fadeInUp"
        onClickAway={() => this.closeModal()}>
          <div className='modal-container'>
            <p className='modal-title'>Quiz Started</p>
            <div className='modal-image-container'>
              <img className='modal-image' src='/resources/quiz_started.png'/>
              <img className='modal-image' src='/resources/quiz_started.png'/>
              <img className='modal-image' src='/resources/quiz_started.png'/>
            </div>
            <p className='modal-content'>
              The quiz timer has started. <b>DO NOT</b> refresh or nagivate as
              this will cause the participation fees to be paid again. You will
              be judged on time taken, correct answers and other factors.
            </p>
            <div className='modal-button-container'>
              <button className='btn-modal btn-custom-blue'
                onClick={() => this.closeModal()}>
                  Close
              </button>
            </div>
          </div>
        </Modal>
        <div className='full-width'>
          <div className='header'> Quiz </div>
        </div>
        <div className='full-width'>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            { this.renderQuestions() }
            <div className='sub-container-btn'>
              <button type="submit" className="btn-custom-blue btn-full-width">Submit</button>
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

  componentDidUpdate() {
    if(!this.state.visible && !this.state.shownOnce) {
      this.openModal();
    }
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
