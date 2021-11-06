import axios from "axios";
import { useState, useEffect } from "react";
import Content from "../../components/content";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
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
    <>
      <div className="position-relative">
        <Slider autoplay={3000}>
          {slideshow.map((c, index) => (
            <div
              key={index}
              style={{
                background: `linear-gradient(to bottom, rgba(255,255,255,0) 30%, rgba(0,0,0)), url('https://image.tmdb.org/t/p/w1280/${c.backdrop_path}') no-repeat center center`,
              }}
            >
              <div className="position-absolute top-50 start-50 translate-middle">
                <div>
                  <h1>{c.name || c.title}</h1>
                </div>
                <div>
                  <p>{c.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
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
    </>
  );
};

export default Home;
