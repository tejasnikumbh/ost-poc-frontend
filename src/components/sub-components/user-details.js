import React, {Component} from 'react';

class UserDetails extends Component {

    render() {
      const user = this.props.user;
      return (
        <div>
          <div className='content-item'>
            <b style={{'color':'#3f3f3f', 'fontWeight':'400'}}>Token Balance</b>
            <div className='label-tag red'>
              {user.ost_details.token_balance} DPLT
            </div>
          </div>
          <div className='content-item'>
            <b style={{'color':'#3f3f3f', 'fontWeight':'400'}}>Airdrop Earnings</b>
            <div className='label-tag red'>
              {user.ost_details.total_airdropped_tokens} DPLT
            </div>
          </div>
          <div className='content-item'>
            <b style={{'color':'#3f3f3f', 'fontWeight':'400'}}>Quiz Earnings</b>
            <div className='label-tag red'>
              {this.props.getQuizEarningsForUser()} DPLT
            </div>
          </div>
        </div>
      );
    }
}

export default UserDetails;
