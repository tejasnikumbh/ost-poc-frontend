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

    var properDate = getProperDate(submission.quiz.time);
    var properTime = getProperTime(submission.quiz.time);

    const alreadyTaken = submission.alreadyTaken;
    var message = "Thanks for taking the quiz. Scores will be updated soon";
    if(!alreadyTaken) {
      return <div> {message} </div>
    }

    return (
      <div>
      {submission.message} on <b> {`${properDate}`} </b> at <b> {`${properTime}`} </b>.
      Your score for this quiz was <b> {`${submission.quiz.score}`} </b>.
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

function getProperDate(dateString) {
  var date = new Date(dateString);
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayName = days[date.getDay()];
  var months= ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  var monthName = months[date.getMonth()];
  var formatted = `${dayName}, ${date.getDate()} ${monthName} - ${date.getFullYear()}`;
  return formatted;
}

function getProperTime(dateString) {
  var date = new Date(dateString);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function mapStateToProps({submission}) {
  return {submission};
}

export default connect(mapStateToProps)(Thankyou);
