import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from './../actions/index';
import {Link} from 'react-router-dom';

class PostsDetail extends Component {

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }

  handleDelete() {
    const {id} = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    })
  }

  render() {
    if(!this.props.post) {
      return(<div> Loading... </div>);
    }

    const {post} = this.props;

    return(
      <div className="container">
        <div className="inline">
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        </div>
        <div className="inline cancel">
          <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>
            Delete
          </button>
        </div>
        <div className="post-details">
          <h1 className="posts-header"> {post.title}</h1>
          <h3 className="posts-categories"> {post.categories} </h3>
          <p className="posts-content"> {post.content} </p>
        </div>
      </div>
    );
  }
}


function mapStateToProps({posts}, ownProps) {
  console.log(ownProps);
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsDetail);
