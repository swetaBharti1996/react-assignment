import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import EditComponent from "./EditComponent";
import { Pagination } from "antd";
import queryString from "query-string";
import { loadPost } from "./actions/postActions";
import styled from "styled-components";

class AllPost extends Component {
  state = {};

  componentDidMount() {
    let data = {};
    data.pageNo = 1;
    data.size = 20;
    let query = queryString.stringify(data);
    loadPost(query);
  }

  handlePgination = (pageNo, size) => {
    let data = {};
    data.pageNo = pageNo;
    data.size = 10;
    let query = queryString.stringify(data);
    loadPost(query);
  };

  render() {
    return (
      <div>
        <h1 className="post_heading">All Users</h1>
        {this.props.posts.map((post) => (
          <div key={post.id}>
            {post.editing ? (
              <EditComponent post={post} key={post.id} />
            ) : (
              <Post post={post} key={post.id} />
            )}
          </div>
        ))}
        <Pagination
          style={{ marginLeft: "60%", marginTop: "5%" }}
          total={60}
          current={this.state.page}
          defaultCurrent={1}
          onChange={(pageNo, size) => this.handlePgination(pageNo, size)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadProfile: (data) => {
      dispatch(loadPost(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPost);
