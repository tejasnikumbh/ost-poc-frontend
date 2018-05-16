import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchProfile, logout} from './../actions/index';
import {Link, Redirect} from 'react-router-dom';

class Profile extends Component {

  logoutClicked() {
    const token = sessionStorage.getItem('x-auth');
    this.props.logout(token);
  }

  renderProfile() {
    const user = this.props.profile.data.user;
    const quizMetaData = this.props.profile.data.quiz;
    // console.log(user, quizMetaData);
    return (
      <div className='sub-container-quiz'>
        <div className='header'> Quiz </div>
        <div className='body'>
          <div className='title'> User Details </div>
          <div className='content'>
              <div className='content-item'> Email: {user.email} </div>
              <div className='content-item'>
                Token Balance: {user.ost_details.token_balance}
              </div>
          </div>
          <div className='title'> Quizzes Available </div>
          <div className='content'>
            <Link to="/quiz/instruction" style={{ textDecoration: 'none' }}>
              <div className='container-quiz-item'>
                <div className='label-title'>
                  {quizMetaData.title}
                </div>
                <div className='label-tag'>
                  {quizMetaData.participation_fee} DPLT
                </div>
              </div>
            </Link>
          </div>
          <div className='content'>
            <Link to="/quiz/instruction" style={{ textDecoration: 'none' }}>
              <div className='container-quiz-item'>
                <div className='label-title'>
                  {quizMetaData.title}
                </div>
                <div className='label-tag'>
                  {quizMetaData.participation_fee} DPLT
                </div>
              </div>
            </Link>
          </div>
          <div className='content'>
            <Link to="/quiz/instruction" style={{ textDecoration: 'none' }}>
              <div className='container-quiz-item'>
                <div className='label-title'>
                  {quizMetaData.title}
                </div>
                <div className='label-tag'>
                  {quizMetaData.participation_fee} DPLT
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className='sub-container-spacer'> ... </div>
        <div className='sub-container-btn'>
          <button onClick={this.logoutClicked.bind(this)}
            className='btn-custom'> Logout </button>
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
    // console.log("REREnvder");
    // Case when fetching profile and not authenticated
    // if(_.isEmpty(this.props.profile.data) &&
    // !this.props.profile.isAuthenticated) {
    //   return (<div> Loading... </div>);
    // }
    // // Case when fetched profile but not authenticated
    // if(!_.isEmpty(this.props.profile.data) &&
    // !this.props.profile.isAuthenticated) {
    //   return (<div> 401 Access Unauthorized </div>);
    // }
    // Correct access
    if(!sessionStorage.getItem('x-auth')) {
      return (
        <Redirect to="/login"/>
      );
    }

    if(_.isEmpty(this.props.profile.data)) {
      return (<div> Loading... </div>);
    }

    return this.renderProfile();
  }
}

function mapStateToProps({user, profile}) {
  return {user, profile}
}

export default connect(mapStateToProps, {fetchProfile, logout})(Profile);
