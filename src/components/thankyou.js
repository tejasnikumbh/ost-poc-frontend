import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import _ from 'lodash';

class Thankyou extends Component {

  renderMessage() {
    const submission = this.props.submission.data;
    var message = "Thanks for trying to submit a response.";
    if(_.isEmpty(submission)) {
        return <div> { message } </div>
    }

    const alreadyTaken = submission.alreadyTaken;
    var message = "Thanks for taking the quiz. Scores will be updated soon";
    if(alreadyTaken) {
      message = submission.message;
      message += ` at ${submission.quiz.time}.
      Your score for this quiz was ${submission.quiz.score}.
      Please try other quizzes`;
    }
    return (<div> {message} </div>);
  }

  render() {
    if(!sessionStorage.getItem('x-auth')) {
      return (
        <Redirect to="/login"/>
      );
    }

    return(
      <div className='sub-container-quiz'>
        <div className='header'> Quiz </div>
        <div className='body'>
          <div className='title'> Feedback </div>
          <div className='content'>
            {this.renderMessage()}
          </div>
        </div>
        <div className='spacer'></div>
        <div className='sub-container-btn' style={{textAlign:'left'}}>
          <Link to={`/profile`}>
            <button className='btn-custom'> Back to Profile </button>
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
