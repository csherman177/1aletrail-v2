import React from 'react';
import { Link } from 'react-router-dom';

const CommentsList = ({ comments, title }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col">
              <div className="brew-card mb-3">
                <h4>Commented by {comment.user.username} at 
                  <Link 
                    to={`/breweries/${comment.breweryId}`}
                  >
                    {comment.breweryName}
                  </Link>
                </h4>
                <h4>{comment.text}</h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentsList;
