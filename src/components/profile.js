import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchProfile, VIEW_PROFILE} from './../actions/index';
import {Link} from 'react-router-dom';

class Profile extends Component {

  renderProfile() {
    const user = this.props.profile.data.user;
    const quizMetaData = this.props.profile.data.quiz;
    console.log(user, quizMetaData);
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
        </div>
      </div>
    );
  }

  componentDidMount() {
    const token = sessionStorage.getItem('x-auth');
    this.props.fetchProfile(token);
  }

  render() {
    // Case when fetching profile
    if(_.isEmpty(this.props.profile.data) &&
    !this.props.profile.isAuthenticated) {
      return (<div> Loading... </div>);
    }
    // Case when unauthorized access
    if(!_.isEmpty(this.props.profile.data) &&
    !this.props.profile.isAuthenticated) {
      return (<div> 401 Access Unauthorized </div>);
    }
    // Correct access
    return this.renderProfile();
  }
}

function mapStateToProps({profile}) {
  return {profile}
}

export default connect(mapStateToProps, {fetchProfile})(Profile);
