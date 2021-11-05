import axios from "axios";
import { useEffect, useState } from "react";
import Content from "../../components/content";
import * as Icon from "react-bootstrap-icons";
import "../../App.css";

const Dramas = () => {
  const [dramas, setDramas] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_API_KEY}`
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
  }, []);

  return (
    <div className="container">
      <h1 class="pt-3">Dramas</h1>
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
