import React, { useState, useEffect, useReducer } from "react";
import "../Home.scss";
import Movie from "./Movie";
import spinner from "../ajax-loader.gif";
import movieDBIcon from "../movieDBIcon.png";
import SearchBar from "./SearchBar";
import Axios from "axios";

const POPULAR_MOVIES_API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=6ed12e064b90ae1290fa326ce9e790ff";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_MOVIES":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "FETCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "FETCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const Home = () => {
  const [searchField, setSearchField] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Axios.get(POPULAR_MOVIES_API_URL).then(response => {
      dispatch({
        type: "FETCH_MOVIES_SUCCESS",
        payload: response.data.results
      });
    });
  }, []);

  const search = searchValue => {
    setSearchField(true);
    dispatch({
      type: "FETCHING_MOVIES"
    });

    Axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&query=${searchValue}&page=1`
    )
      .then(response => {
        if (response.data.results.length) {
          dispatch({
            type: "FETCH_MOVIES_SUCCESS",
            payload: response.data.results
          });
        } else {
          dispatch({
            type: "FETCH_MOVIES_FAILURE",
            error: "There are no movies that matched your query."
          });
        }
      })
      .catch(function() {
        dispatch({
          type: "FETCH_MOVIES_FAILURE",
          error: "There are no movies that matched your query."
        });
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="Home">
      <img className="movieDBIcon" src={movieDBIcon} alt="" />
      <div className="rect-1" />
      <div className="rect-2" />
      <div className="rect-3" />
      <div className="rect-4" />
      <div className="rect-5" />
      <div className="rect-6" />
      <SearchBar search={search} />
      {!searchField ? (
        <div className="movie-heading">Popular Movies</div>
      ) : null}
      <div className="movies">
        {loading && !errorMessage ? (
          <img className="spinner" src={spinner} alt="Loading spinner" />
        ) : errorMessage ? (
          <div className="error-message">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.id}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
