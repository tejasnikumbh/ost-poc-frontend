import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchProfile} from './../actions/index';
import {Link, Redirect} from 'react-router-dom';
import Header from './sub-components/header';

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
        <div className='full-width'><Header/></div>
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
              <div className='label-tag red' >
                {quiz.participation_fee} DPLT
              </div>
            </div>

            <br/>
            <div className='content'>
              <div className='label-title' style={{float: 'left'}}>
                Reward Amount [Max]
              </div>
              <div className='label-tag red' >
                {quiz.reward_amount} DPLT
              </div>
            </div>
            <br/>

            <div className='content'>
              <div className='label-title' style={{float: 'left'}}>
                Percentage Rewarded
              </div>
              <div className='label-tag red' >
                Top {quiz.percentage_rewarded * 100} %
              </div>
            </div>
            <br/>
          </div>

          <div className='half-width'>
            <div className='title'> Note </div>
            <div className="content">
              <b>Do not refresh or navigate </b>while taking the quiz. Each
              refresh will cause the paticipation fee to be deducted again as a
              penalty. If you run out of tokens while doing this, you will not
              be able to complete the quiz.
            </div>
          </div>
          <div className='full-width'><div className='spacer'></div></div>
          <div className='full-width'>
            <div className='sub-container-btn' style={{textAlign:'left'}}>
              <Link to={`/quiz/${quiz._id}`}>
                <button className='btn-custom-blue btn-full-width yellow'>
                  Start Quiz
                </button>
              </Link>
            </div>
          </div>
      </div>
    );
  }

  componentDidMount() {
    const token = sessionStorage.getItem('x-auth');
    if(!token) { return }
    this.props.fetchProfile(token);
  }

  render() {

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
