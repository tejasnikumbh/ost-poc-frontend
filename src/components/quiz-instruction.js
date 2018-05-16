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
      <div className='sub-container-quiz'>
        <div className='full-width'>
          <div className='header'> Quiz </div>

        </div>
        <div className='full-width'>
          <div className='title'> Instructions </div>
          <div className='content'>
            Welcome to D-Quiz. You can participate in this quiz
            by paying the participation fees charged in DPLT. The
            top percentage (specified below) will be rewarded
            variable amounts of tokens based on our performance
            evaluatiom algorithm. The algorithm takes a variety of
            factors into account, so try not to cheat. The quiz is
            timed as well, so the faster you can answer, the better.
          </div>
        </div>

          <div className='half-width'>
            <div className='title'> Specifics </div>
            <div className='content'>
              <div className='label-title' style={{float: 'left'}}>
                Participation Fee
              </div>
              <div className='label-tag' >
                {quiz.participation_fee} DPLT
              </div>
            </div>

            <br/>
            <div className='content'>
              <div className='label-title' style={{float: 'left'}}>
                Reward Amount
              </div>
              <div className='label-tag' >
                {quiz.reward_amount} DPLT
              </div>
            </div>
            <br/>

            <div className='content'>
              <div className='label-title' style={{float: 'left'}}>
                Percentage Rewarded
              </div>
              <div className='label-tag' >
                Top {quiz.percentage_rewarded * 100} %
              </div>
            </div>
            <br/>
          </div>

          <div className='half-width'>
            <div className='title'> Note </div>
            <div className="content">
              <b>Do not refresh </b>while taking the quiz. Each refresh will
              cause the paticipation fee to be deducted again as a penalty.
              If you run out of tokens while doing this, you will not be
              able to complete the quiz.
            </div>
          </div>


          <div className='full-width'><div className='spacer'></div></div>
          <div className='full-width'>
            <div className='sub-container-btn'>
              <Link to={`/quiz/${quiz._id}`}>
                <button className='btn-custom'> Take Quiz </button>
              </Link>
            </div>
          </div>
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
