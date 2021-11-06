import axios from "axios";
import { useEffect, useState } from "react";
import Content from "../../components/content";
import Genres from "../../components/genres";
import useGenre from "../../hooks/useGenre";
import * as Icon from "react-bootstrap-icons";
import "../../App.css";

const Dramas = () => {
  const [dramas, setDramas] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreURL = useGenre(selectedGenres);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const fetchData = async () => {
    const { data } = await axios.get(
      //`https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_API_KEY}`

      `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&without_genres=${genreURL}`
    );

    setDramas(data.results);
  };

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/tv/?api_key=${TMDB_API_KEY}&query=${keywords}`
    );

    setDramas(data.results);
  };

  useEffect(() => {
    fetchData();
    fetchSearch();
  }, [genreURL]);

  return (
    <div className="container">
      <h1 className="pt-3">Dramas</h1>
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
          type="tv"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
        />
      </div>
      <div className="wrap-content pb-3">
        {dramas.map((d) => (
          <Content
            id={d.id}
            title={d.name}
            image={d.poster_path}
            media={d.media_type || "tv"}
          />
        ))}
      </div>
    </div>
  );
};

export default Dramas;
