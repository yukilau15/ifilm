import axios from "axios";
import { useEffect, useState } from "react";
import { img_300, unavailable } from "../../config/config";
import * as Icon from "react-bootstrap-icons";
import "../../App.css";

const MDetail = ({ match }) => {
  const [movieTitle, setMovieTitle] = useState([]);
  const [movieImage, setMovieImage] = useState([]);
  const [movieOverview, setMovieOverview] = useState([]);
  const [movieRated, setMovieRated] = useState([]);
  const [movieGenre, setMovieGenre] = useState([]);
  const [movieRuntime, setMovieRuntime] = useState([]);
  const [movieLanguage, setMovieLanguage] = useState([]);
  const [videoKey, setVideoKey] = useState([]);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  var movieAPI1, movieAPI2;

  var movieGenreArray = new Array();
  var movieLanguageArray = new Array();

  var getMovieTitle,
    getMovieImage,
    getMovieOverview,
    getMovieRated,
    getMovieGenre,
    getMovieRuntime,
    getMovieLanguage,
    getVideoKey;

  const fetchVideo = async (id) => {
    movieAPI1 = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}`;

    await axios.get(movieAPI1).then((response) => {
      getVideoKey = response.data.results[0]?.key;
    });

    setVideoKey(getVideoKey);
  };

  const fecthData = async (id) => {
    movieAPI1 = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`;

    axios.get(movieAPI1).then((response) => {
      getMovieTitle = response.data.title;
      getMovieImage = response.data.poster_path;
      getMovieOverview = response.data.overview;
      getMovieRuntime = response.data.runtime + " min";

      for (var i = 0; i < response.data.genres.length; i++) {
        movieGenreArray[i] = JSON.stringify(
          response.data.genres[i].name
        ).replace(/"/g, "");
      }

      getMovieGenre = movieGenreArray.join(", ");

      for (var i = 0; i < response.data.spoken_languages.length; i++) {
        movieLanguageArray[i] = JSON.stringify(
          response.data.spoken_languages[i].english_name
        ).replace(/"/g, "");
      }

      getMovieLanguage = movieLanguageArray.join(", ");

      movieAPI2 = `https://www.omdbapi.com/?t=${getMovieTitle}&type=movie&apikey=${OMDB_API_KEY}`;

      axios.get(movieAPI2).then((response) => {
        getMovieRated = response.data.Rated || "N/A";
        getMovieGenre = response.data.Genre || `${getMovieGenre}` || "N/A";
        getMovieRuntime = response.data.Runtime || `${getMovieRuntime}`;
        getMovieLanguage = response.data.Language || `${getMovieLanguage}`;

        setMovieTitle(getMovieTitle);
        setMovieImage(getMovieImage);
        setMovieRated(getMovieRated);
        setMovieGenre(getMovieGenre);
        setMovieRuntime(getMovieRuntime);
        setMovieLanguage(getMovieLanguage);
        setMovieOverview(getMovieOverview);
      });
    });
  };

  useEffect(() => {
    fecthData(match.params.id);
    fetchVideo(match.params.id);
  }, []);

  return (
    <div className="container">
      <div class="d-md-flex flex-md-equal w-100">
        <div class="me-md-3">
          <div class="my-3">
            <img src={movieImage ? `${img_300}${movieImage}` : unavailable} />
          </div>
        </div>
        <div class="d-flex align-items-center me-md-3">
          <div class="my-3">
            <h3>{movieTitle}</h3>
            <span>
              {movieRated}&emsp;
              {movieGenre}&ensp;&#9679;&ensp;
              {movieRuntime}&ensp;&#9679;&ensp;
              {movieLanguage}
            </span>
            <h4 class="pt-3">Overview</h4>
            <p>{movieOverview}</p>
            <a
              class="btn btn-secondary me-md-3"
              target="_blank"
              href={`https://www.youtube.com/watch?v=${videoKey}`}
            >
              <span>
                <Icon.PlayFill /> Play Trailer
              </span>
            </a>
            <button class="btn btn-secondary me-md-3">
              <span>
                <Icon.Heart />
              </span>
            </button>
            <button class="btn btn-secondary me-md-3">
              <span>
                <Icon.Bookmark />
              </span>
            </button>
            <button class="btn btn-secondary me-md-3">
              <span>
                <Icon.Star />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MDetail;
