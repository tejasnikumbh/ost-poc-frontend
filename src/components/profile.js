import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchProfile, requestTokens, logout} from './../actions/index';
import {Link, Redirect} from 'react-router-dom';
import Modal from 'react-awesome-modal';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        requestTokenModal: {
          visible : false
        },
        alreadyTakenModal: {
          visible: false
        }
    }
  }

  openRequestTokenModal() {
    this.setState({
        requestTokenModal : {
          visible: true
        }
    });
  }

  closeRequestTokenModal() {
    this.setState({
        requestTokenModal : {
          visible : false
        }
    });
  }

  openAlreadyTakenModal() {
    this.setState({
        alreadyTakenModal : {
          visible: true
        }
    });
  }

  closeAlreadyTakenModal() {
    this.setState({
        alreadyTakenModal : {
          visible : false
        }
    });
  }

  quizAlreadyTaken() {
      const user = this.props.profile.data.user;
      const quiz = this.props.profile.data.quiz;
      // No quiz taken
      if(_.isEmpty(user.performance.quizzes)) {
        return false;
      }
      // Testing if quiz is already taken
      const quizzesAlreadyTaken = _.map(user.performance.quizzes,(q) => {
        return q._id
      });
      return _.includes(quizzesAlreadyTaken, quiz._id);
  }

  logoutClicked() {
    const token = sessionStorage.getItem('x-auth');
    this.props.logout(token);
  }

  requestTokensClicked() {
    const token = sessionStorage.getItem('x-auth');
    this.openRequestTokenModal();
    this.props.requestTokens(token);
  }

  navigateToQuizInstructionClicked() {
    const route = "/quiz/instruction";
    this.quizAlreadyTaken() ? this.openAlreadyTakenModal() : this.props.history.push(route);

  }

  renderProfile() {
    const user = this.props.profile.data.user;
    const quizMetaData = this.props.profile.data.quiz;
    // console.log(user, quizMetaData);
    return (
      <div className='sub-container-quiz'>

        <Modal visible={this.state.requestTokenModal.visible}
        width="400" height="300"
        effect="fadeInUp"
        onClickAway={() => this.closeRequestTokenModal()}>
          <div className='modal-container'>
            <p className='modal-title'>Request Approved</p>
            <div className='modal-image-container'>
              <img className='modal-image' src='/resources/green_tick.png'/>
            </div>
            <p className='modal-content'>
              Your request for DPLT tokens has been approved. You have been granted
              10 DPLT tokens shortly.
            </p>
            <div className='modal-button-container'>
              <button className='btn-modal btn-custom-blue'
                onClick={() => this.closeRequestTokenModal()}>
                  Close
              </button>
            </div>
          </div>
        </Modal>

        <Modal visible={this.state.alreadyTakenModal.visible}
        width="400" height="300"
        effect="fadeInUp"
        onClickAway={() => this.closeAlreadyTakenModal()}>
          <div className='modal-container'>
            <p className='modal-title'>Quiz Taken</p>
            <div className='modal-image-container'>
              <img className='modal-image' src='/resources/warning.png'/>
            </div>
            <p className='modal-content'>
              You have already taken this quiz. Try participating in other
              available quizzes to start earning DPLT.
            </p>
            <div className='modal-button-container'>
              <button className='btn-modal btn-custom-blue'
                onClick={() => this.closeAlreadyTakenModal()}>
                  Close
              </button>
            </div>
          </div>
        </Modal>

        <div className='header'> Quiz </div>
        <div className='body'>
          <div className='half-width'>
            <div className='title'> User Details </div>
            <div className='content'>
                <div className='content-item'> Email: {user.email} </div>
                <div className='content-item'>
                  Token Balance: {user.ost_details.token_balance}
                </div>
                <div className='content-item'>
                  Earned via airdrop: {user.ost_details.total_airdropped_tokens}
                </div>
            </div>
          </div>
          <div className='half-width'>
            <div className='title'> Earn Tokens </div>
            <div className='content'>
              <button onClick={this.requestTokensClicked.bind(this)}
                className='btn-custom-blue'>
                Request Tokens
              </button>
            </div>
          </div>
          <div className='full-width'>
            <div className='title'> Quizzes Available </div>
            <div className='content'>
              <div className='container-quiz-item'
              onClick={this.navigateToQuizInstructionClicked.bind(this)}>
                <div className='label-title'>
                  {quizMetaData.title}
                </div>
                <div className='label-tag red'>
                  {quizMetaData.participation_fee} DPLT
                </div>
              </div>
            </div>
          </div>
          <div className='full-width'>
            <div className='sub-container-spacer'> ... </div>
            <div className='sub-container-btn'>
              <button onClick={this.logoutClicked.bind(this)}
               className='btn-custom'>
                Logout
              </button>
            </div>
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

export default connect(mapStateToProps, {fetchProfile, requestTokens, logout})(Profile);
