import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

class Thankyou extends Component {
  render() {

    if(!sessionStorage.getItem('x-auth')) {
      return (
        <Redirect to="/login"/>
      );
    }

    return(
      <div className="container">
        <div className="content">
          Thank You for taking the quiz! Scores will be updated soon.
        </div>
        <div>
          <Link to='/profile'> Back to profile </Link>
        </div>
      </div>
      );
  }
}

export default Thankyou;
