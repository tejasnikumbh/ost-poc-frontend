import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchProfile, VIEW_PROFILE} from './../actions/index';


class Profile extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem('x-auth');
    this.props.fetchProfile(token);
  }

  render() {
    console.log(this.props);
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
    console.log(this.props.profile.data);
    return(<div> Profile Details </div>);
  }
}

function mapStateToProps({profile}) {
  return {profile}
}

export default connect(mapStateToProps, {fetchProfile})(Profile);
