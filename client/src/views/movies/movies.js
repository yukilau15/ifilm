import axios from "axios";
import { useEffect, useState } from "react";
import Content from "../../components/content";
import * as Icon from "react-bootstrap-icons";
import "../../App.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
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
  }, []);

  return (
    <div className="container">
      <h1 class="pt-3">Movies</h1>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <button
          class="btn btn-secondary"
          type="button"
          onClick={fetchSearch}
          aria-label="Search"
        >
          <span>
            <Icon.Search />
          </span>
        </button>
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
  );
};

export default Movies;
