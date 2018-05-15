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
      <div className='container'>
        <div className='header'> Header </div>
        <div className='title'> User Details </div>
        <div className='details'>
            <div className='detail-item'> Email: {user.email} </div>
            <div className='detail-item'>
              Token Balance: {user.ost_details.token_balance}
            </div>
        </div>
        <div className='title'> Quizzes Available </div>
        <div className='details'>
        <div className='detail-item'>
            <Link to="/quiz/instruction"> {quizMetaData.title} </Link>
        </div>
        <button onClick={this.logoutClicked.bind(this)} > Logout </button>
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
