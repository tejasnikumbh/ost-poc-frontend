import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchProfile, requestTokens, logout} from './../actions/index';
import {Link, Redirect} from 'react-router-dom';
import Modal from 'react-awesome-modal';
import CustomModal from './sub-components/custom-modal';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        requestTokenModal: {
          visible : false
        },
        alreadyTakenModal: {
          visible: false
        },
        insufficientBalanceModal: {
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

  openInsufficientBalanceModal() {
    this.setState({
        insufficientBalanceModal : {
          visible: true
        }
    });
  }

  closeInsufficientBalanceModal() {
    this.setState({
        insufficientBalanceModal : {
          visible : false
        }
    });
  }

  getQuizEarningsForUser() {
    const user = this.props.profile.data.user;
    var earning = 0;
    user.performance.quizzes.forEach((quiz) => {
      earning += quiz.earning;
    })
    return earning;
  }

  insufficientBalance() {
    const user = this.props.profile.data.user;
    const quiz = this.props.profile.data.quiz;

    return user.ost_details.token_balance < quiz.participation_fee;
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
    // clean up
    this.props.profile.data = {};
  }

  requestTokensClicked() {
    const token = sessionStorage.getItem('x-auth');
    this.openRequestTokenModal();
    this.props.requestTokens(token);
  }

  navigateToQuizInstructionClicked() {

    if(this.quizAlreadyTaken()) {
      this.openAlreadyTakenModal();
      return;
    }

    if(this.insufficientBalance()) {
      this.openInsufficientBalanceModal();
      return;
    }

    const route = "/quiz/instruction";
    this.props.history.push(route);
    return;
  }

  renderStats() {
    if(!this.quizAlreadyTaken()) {
      const quiz = this.props.profile.data.quiz;
      return (
        <div className='quiz-item-stats'>
          <div className='label-tag red'>
            Fee: {quiz.participation_fee} DPLT
          </div>
        </div>
      );
    }

    const user = this.props.profile.data.user;
    const quiz = this.props.profile.data.quiz;

    var curQuiz = user.performance.quizzes.filter((q) => {
      return q._id == quiz._id
    })[0];
    return(
      <div className='quiz-item-stats'>
        <div className='label-tag green' style={{marginRight:'10px'}}>
          Score: {curQuiz.score}%
        </div>
        <div className='label-tag purple' style={{marginRight:'10px'}}>
          Earned: {curQuiz.earning} DPLT
        </div>
      </div>
    );
  }

  renderProfile() {
    const user = this.props.profile.data.user;
    const quizMetaData = this.props.profile.data.quiz;
    // console.log(user, quizMetaData);
    const modalData = {
      requestTokens: {
        title: `Request Approved`,
        content: `Your request for DPLT tokens has been approved.
        You will be granted 1 DPLT token(s) shortly`,
        image: `green_tick.png`
      },
      alreadyTaken: {
        title: `Quiz Taken`,
        content: `You have already taken this quiz. Try participating in other
        available quizzes to start earning DPLT.`,
        image: `green_tick.png`
      },
      insufficientBalance: {
        title: `Insufficient Balance`,
        content: `You do not have sufficient balance to take this quiz. Try
        requesting more tokens.`,
        image: `warning.png`
      }
    };
    return (
      <div className='sub-container-quiz'>

        <CustomModal title={modalData.requestTokens.title}
        content={modalData.requestTokens.content}
        image={modalData.requestTokens.image}
        visible={this.state.requestTokenModal.visible}
        onClickAwayFunction={this.closeRequestTokenModal.bind(this)}/>

        <CustomModal title={modalData.alreadyTaken.title}
        content={modalData.alreadyTaken.content}
        image={modalData.alreadyTaken.image}
        visible={this.state.alreadyTakenModal.visible}
        onClickAwayFunction={this.closeAlreadyTakenModal.bind(this)}/>

        <CustomModal title={modalData.insufficientBalance.title}
        content={modalData.insufficientBalance.content}
        image={modalData.insufficientBalance.image}
        visible={this.state.insufficientBalanceModal.visible}
        onClickAwayFunction={this.closeInsufficientBalanceModal.bind(this)}/>

        <div className='header'> DQuiz </div>
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
                <div className='content-item'>
                  Earned via quizzes: {this.getQuizEarningsForUser()}
                </div>
            </div>
          </div>
          <div className='half-width'>
            <div className='title'> Earn Tokens </div>
            <div className='content'>
              <button onClick={this.requestTokensClicked.bind(this)}
                className='btn-custom-blue btn-full-width'>
                Request Tokens
              </button>
            </div>
          </div>
          <div className='full-width'>
            <div className='title'> Quizzes </div>
            <div className='content'>
              <div className='container-quiz-item'
              onClick={this.navigateToQuizInstructionClicked.bind(this)}>
                <div className='label-title'>
                  {quizMetaData.title}
                </div>
                {this.renderStats()}
              </div>
            </div>
          </div>
          <div className='full-width'>
            <div className='sub-container-spacer'> ... </div>
            <div className='sub-container-btn'>
              <button onClick={this.logoutClicked.bind(this)}
               className='btn-custom-blue btn-full-width'>
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
    // Correct access
    if(!sessionStorage.getItem('x-auth')) {
      return (
        <Redirect to="/login"/>
      );
    }
    console.log(this.props.profile);
    if(_.isEmpty(this.props.profile.data)) {
      return (<div> Loading... </div>);
    }

    return this.renderProfile();
  }
}

function mapStateToProps({user, profile}) {
  return {user, profile}
}

export default connect (mapStateToProps, {fetchProfile, requestTokens, logout})(Profile);
