import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../MovieDetails.scss";

const MovieDetails = ({ match }) => {
  const movieId = match.params.movieId;

  const [movieDetails, setMovieDetails] = useState();

  const convertMinsToHrsMins = mins => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${h}h ${m}min`;
  };

  useEffect(() => {
    Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US`
    ).then(response => {
      setMovieDetails(response.data);
    });
  }, []);

  console.log(movieDetails);

  return (
    <div className="movie-details">
      {movieDetails ? (
        <div className="movie-view">
          <div
            className="backdrop"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1400_and_h450_face${movieDetails.backdrop_path})`
            }}
          >
            <Link to="/">
              <p className="back-arrow">&larr;</p>
            </Link>
          </div>
          <div className="movie-info">
            <img
              className="movie-poster"
              alt={`The movie titled: ${movieDetails.Title}`}
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movieDetails.poster_path}`}
            />
            <div className="title-date">
              <div className="movie-title">{movieDetails.title}</div>
              <p className="date">
                {moment(movieDetails.release_date).format("YYYY")}
              </p>
              <p className="run-time">
                {convertMinsToHrsMins(movieDetails.runtime)}
              </p>
            </div>
          </div>

          <hr />

          <div className="movie-overview">
            <span>Overview</span>
            <p>{movieDetails.overview}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetails;
