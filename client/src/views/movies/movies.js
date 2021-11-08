import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import Content from "../../components/content";
import Genres from "../../components/genres";
import useGenre from "../../hooks/useGenre";
import * as Icon from "react-bootstrap-icons";
import "../../App.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreURL = useGenre(selectedGenres);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const fetchData = async () => {
    const { data } = await axios.get(
      //`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`

      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreURL}`
    );

    setMovies(data.results);
  };

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie/?api_key=${TMDB_API_KEY}&query=${keywords}`
    );

    setMovies(data.results);
  };

  useEffect(() => {
    fetchData();
    fetchSearch();
  }, [genreURL]);

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="pt-3">Movies</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <button
            className="btn btn-secondary"
            type="button"
            onClick={fetchSearch}
            aria-label="Search"
          >
            <span>
              <Icon.Search />
            </span>
          </button>
        </div>
        <div className="mb-3">
          <Genres
            type="movie"
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
          />
        </div>
        <div className="wrap-content pb-3">
          {movies.map((m) => (
            <Content
              id={m.id}
              title={m.title}
              image={m.poster_path}
              media={m.media_type || "movie"}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Movies;
