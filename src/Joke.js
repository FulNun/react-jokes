
import React from 'react';
import './Joke.css';

const Joke = ({ text, votes, upvote, downvote }) => {
  return (
    <div className="Joke">
      <div className="Joke-text">{text}</div>
      <div className="Joke-votes">
        <button onClick={upvote}>⬆</button>
        <span>{votes}</span>
        <button onClick={downvote}>⬇</button>
      </div>
    </div>
  );
};

export default Joke;
