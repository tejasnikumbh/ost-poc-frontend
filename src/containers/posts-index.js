import React, {Component} from 'react';
import {fetchPosts} from './../actions/index';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import _ from 'lodash';

class PostsIndex extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, (post) => {
      return (
        <li className="list-group-item" key={post.id} >
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return(
      <div className="container">
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add Post
          </Link>
        </div>
        <h1 className="posts-header"> Posts </h1>
        <div className="posts">
          <ul className="list-group">
            { this.renderPosts() }
          </ul>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
