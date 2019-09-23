import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  const moviePoster = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`;
  return (
    <div className="movie">
      <Link to={`/movie/${movie.id}`}>
        <img alt={`The movie titled: ${movie.Title}`} src={moviePoster} />
      </Link>
      <span
        style={{
          background: movie.vote_average * 10 >= 75 ? "#11a051" : "#41098a"
        }}
        className="user-score"
      >{`${movie.vote_average * 10}%`}</span>
      <Link to={`/movie/${movie.id}`}>
        <p className="movie-name">{movie.title}</p>
      </Link>
      <p className="release-date">
        {moment(movie.release_date).format("MMMM YYYY")}
      </p>
    </div>
  );
};

export default Movie;
