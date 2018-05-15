import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchProfile} from './../actions/index';
import {Link, Redirect} from 'react-router-dom';

import _ from 'lodash';

class QuizInstruction extends Component {

  renderQuizInstruction() {
    // console.log(this.props.profile.data);
    if(_.isEmpty(this.props.profile.data)) {
      return(<div> Loading... </div>);
    }

    const quiz = this.props.profile.data.quiz;
    return (
      <div className='container'>
        <div className='header'> Header </div>
        <div className='title'> Instructions </div>
        <div className='content'>
          Welcome to D-Quiz. You can participate in this quiz
          by paying the participation fees charged in DPLT. The
          top percentage (specified below) will be rewarded
          variable amounts of tokens based on our performance
          evaluatiom algorithm. The algorithm takes a variety of
          factors into account, so try not to cheat. The quiz is
          timed as well, so the faster you can answer, the better.
          <br/>
          <b> NOTE:- DO NOT REFRESH WHILE ANSWERING THE QUIZ </b>
        </div>
        <div className='title'> Specifics </div>
        <div className='detail-item'>
          Participation Fee: {quiz.participation_fee} DPLT
        </div>
        <div className='detail-item'>
          Reward Amount: {quiz.reward_amount} DPLT
        </div>
        <div className='detail-item'>
          Percentage Rewarded: {quiz.percentage_rewarded * 100} %
        </div>
        <Link to={`/quiz/${quiz._id}`} className='btn-link'>
          <button className='btn btn-primary'> Take Quiz </button>
        </Link>
      </div>
    );
  }

  // For auth population and quiz meta data
  // componentDidMount() {
  //   if(!this.props.profile.isAuthenticated) {
  //     const token = sessionStorage.getItem('x-auth');
  //     this.props.fetchProfile(token);
  //   }
  // }

  componentDidMount() {
    const token = sessionStorage.getItem('x-auth');
    if(!token) { return }
    this.props.fetchProfile(token);
  }

  render() {
    // Case when fetching profile and not authenticated
    // if(_.isEmpty(this.props.profile.data) &&
    // !this.props.profile.isAuthenticated) {
    //   return (<div> Loading... </div>);
    // }
    // Case when fetched profile but not authenticated
    // if(!_.isEmpty(this.props.profile.data) &&
    // !this.props.profile.isAuthenticated) {
    //   return (<div> 401 Access Unauthorized </div>);
    // }

    if(!sessionStorage.getItem('x-auth')) {
      return (
        <Redirect to="/login"/>
      );
    }

    return this.renderQuizInstruction();
  }
}

function mapStateToProps({profile}) {
  return {profile}
}

export default connect(mapStateToProps, {fetchProfile})(QuizInstruction);
