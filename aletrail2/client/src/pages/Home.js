import React from 'react';
import { useQuery } from '@apollo/client';
import CommentsList from '../components/CommentsList';
import { QUERY_COMMENTS } from '../utils/queries';
import '../styles/Card.css';

export default function Home () {
  const { loading, data } = useQuery(QUERY_COMMENTS);
  const comments = data?.comments || [];

  return (
    <main>
      <h1>Welcome to BrewFly!</h1>
      <div className="intro-card">
        <h3>The 1# brewery site that's tapped into town.</h3>
        <h5>
          Are you a beer, ale, and/or cider enthusiast? <br />
          Do you find yourself at the local brewery most days, or do you enjoy seeking them out for new experiences? <br />
          Then you may be a BrewFly yourself! <br />
          <br />
          <b>BrewFly</b> is a social database website that allows you to search for breweries in your state. <br />
          Connect with your fellow BrewFlies by leaving reviews, display your favorites, and discover new breweries all from one site. 
        </h5>
      </div>
      <div>
          {loading ? (
            <div>Loading comments...</div>
          ) : (
            <CommentsList 
              comments={comments}
              title="Comments in database..."
            />
          )}
      </div>
    </main>
  );
};