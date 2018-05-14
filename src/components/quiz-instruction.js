import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchProfile} from './../actions/index';
import {Link} from 'react-router-dom';

class QuizInstruction extends Component {

  renderQuizInstruction() {
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
        </div>
        <div className='title'> Specifics </div>
        <div className='detail-item'> Participation Fee: {quiz.participation_fee} DPLT</div>
        <div className='detail-item'> Reward Amount: {quiz.reward_amount} DPLT</div>
        <div className='detail-item'> Percentage Rewarded: {quiz.percentage_rewarded * 100} % </div>
        <Link to={`/quiz/${quiz.id}`} className='btn-link'>
          <button className='btn btn-primary'> Take Quiz </button>
        </Link>
      </div>
    );
  }

  // For auth population and quiz meta data
  componentDidMount() {
    if(!this.props.profile.isAuthenticated) {
      const token = sessionStorage.getItem('x-auth');
      this.props.fetchProfile(token);
    }
  }

  render() {
    // Case when unauthorized access
    if(!this.props.profile.isAuthenticated) {
      return (<div> 401 Access Unauthorized </div>);
    }
    return this.renderQuizInstruction();
  }
}

function mapStateToProps({profile}) {
  return {profile}
}

export default connect(mapStateToProps, {fetchProfile})(QuizInstruction);
