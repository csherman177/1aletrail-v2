import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
// import RatingsList from '../components/RatingsList'
import Auth from '../utils/auth';
import '../styles/Card.css';

export default function User () {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getUser().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to view this page.
      </h4>
    );
  }

  return (
    <div>
      <h1>
        Welcome to {userParam ? `${user.username}'s` : 'your'} page!
      </h1>
      <div className="intro-card">
        <div>
          <h5>No comments yet.</h5>
        </div>
      </div>
    </div>
  );
};



          // <RatingsList
          //   ratings={user.ratings}
          //   title={`${user.username}'s ratings`}
          //   showTitle={false}
          //   showUsername={false}
          // />