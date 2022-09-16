import React from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';

const CommentsList = ({ comments, onRemove }) => {
  console.log(comments);
  return comments.map((comment) => {
    return <Comment key={comment._id} {...comment} onRemove={onRemove} />;
  });
};
CommentsList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func
};
export default CommentsList;
