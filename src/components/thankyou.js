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
      <div className='sub-container-quiz'>
        <div className='header'> Quiz </div>
        <div className='body'>
          <div className='title'> Thankyou </div>
          <div className='content'>
            Thank You for taking the quiz! Scores will be updated soon.
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

export default Thankyou;
