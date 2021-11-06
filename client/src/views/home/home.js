import axios from "axios";
import { useEffect, useState } from "react";
import Content from "../../components/content";
import Slideshow from "../../components/slideshow";
import "../../App.css";

const Home = () => {
  const [content, setContent] = useState([]);
  const [slideshow, setSlideshow] = useState([]);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}`
    );

    setContent(data.results);
    setSlideshow(data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="container">
        <h1 className="pt-3">Trending</h1>
        <div className="wrap-content pb-3">
          {content.map((c) => (
            <Content
              id={c.id}
              title={c.name || c.title}
              image={c.poster_path}
              media={c.media_type}
            />
          ))}
        </div>
      </div>
  );
};

export default Home;
