import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderBy } from 'lodash';
import API from '../../api';
import AddCommentForm from '../common/comments/addCommentForm';
import CommentsList from '../common/comments/commentsList';

const Comments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);
  const handleSubmit = (data) => {
    console.log(data);
    API.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, data]));
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);
  console.log(sortedComments);

  const handleRemoveComment = (id) => {
    API.comments.remove(id).then((id) => {
      setComments(comments.filter((comment) => comment._id !== id));
    });
  };

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {sortedComments.length > 0 && (
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
