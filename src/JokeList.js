
import React, { useState, useEffect } from 'react';
import Joke from './Joke';
import axios from 'axios';
import './JokeList.css';

const JokeList = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJokes = async () => {
      let jokeSet = new Set();
      while (jokeSet.size < 5) {
        const response = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' }
        });
        jokeSet.add(response.data);
      }
      setJokes(Array.from(jokeSet).map(joke => ({ ...joke, votes: 0 })));
      setLoading(false);
    };

    fetchJokes();
  }, []);

  const handleVote = (id, delta) => {
    setJokes(jokes.map(joke => 
      joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
    ));
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="JokeList">
      {jokes.map(joke => (
        <Joke
          key={joke.id}
          text={joke.joke}
          votes={joke.votes}
          upvote={() => handleVote(joke.id, 1)}
          downvote={() => handleVote(joke.id, -1)}
        />
      ))}
    </div>
  );
};

export default JokeList;
