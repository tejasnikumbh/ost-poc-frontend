import React,{Component} from 'react';
import {fetchQuiz} from './../actions/index';
import {connect} from 'react-redux';

class QuizContent extends Component {
  // For auth population and quiz meta data
  componentDidMount() {
    if(!this.props.quiz.isAuthenticated) {
      const token = sessionStorage.getItem('x-auth');
      this.props.fetchQuiz(token);
    }
  }

  renderQuiz() {
    console.log(this.props.quiz.data);
    return (
      <div> Hello Quiz </div>
    );
  }

  render() {
    // Case when fetching profile
    if(_.isEmpty(this.props.quiz.data) &&
    !this.props.quiz.isAuthenticated) {
      return (<div> Loading... </div>);
    }
    // Case when unauthorized access
    if(!_.isEmpty(this.props.quiz.data) &&
    !this.props.quiz.isAuthenticated) {
      return (<div> 401 Access Unauthorized </div>);
    }
    // Correct access
    return this.renderQuiz();
  }
}

function mapStateToProps({quiz}) {
  return {quiz};
}

export default connect(mapStateToProps, {fetchQuiz})(QuizContent);
