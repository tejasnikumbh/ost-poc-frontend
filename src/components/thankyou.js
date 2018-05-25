import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProperDate, getProperTime} from './../utils/utils';

import _ from 'lodash';

class Thankyou extends Component {

  renderMessage() {
    const submission = this.props.submission.data;
    var message = "Thanks for trying to submit a response.";
    if(_.isEmpty(submission)) {
        return <div> { message } </div>
    }

    var properDate = getProperDate(submission.quiz.end_time);
    var properTime = getProperTime(submission.quiz.end_time);

    const alreadyTaken = submission.alreadyTaken;
    if(!alreadyTaken) {
      return (
        <div>
        Thanks for taking the quiz. Scores have been updated. You scored a total
        of <b>{`${submission.quiz.score}`} %</b>. You earned <b>
        {`${submission.quiz.earning}`} DPLT</b>. You were measured on time taken,
        answer accuracy and other subjective parameters.
        </div>
      );
    }

    return (
      <div>
      {submission.message} on <b> {`${properDate}`} </b> at <b> {`${properTime}`}
      </b>.Your score for this quiz was <b> {`${submission.quiz.score}`} %</b>.
      You earned <b>{`${submission.quiz.earning}`} DPLT</b> on this quiz.
      Please try other quizzes.
      </div>
    );
  }

  render() {
    if(!sessionStorage.getItem('x-auth')) {
      return (
        <Redirect to="/login"/>
      );
    }

    return(
      <div className='sub-container-quiz'>
        <div className='header'> DQuiz </div>
        <div className='body'>
          <div className='title'> Feedback </div>
          <div className='content'>
            {this.renderMessage()}
          </div>
        </div>
        <div className='spacer'></div>
        <div className='sub-container-btn' style={{textAlign:'left'}}>
          <Link to={`/profile`}>
            <button className='btn-custom-blue btn-full-width'>
              Back to Profile
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({submission}) {
  return {submission};
}

export default connect(mapStateToProps)(Thankyou);
