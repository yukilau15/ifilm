import axios from "axios";
import { useEffect, useState } from "react";
import { img_300, unavailable } from "../../config/config";
import * as Icon from "react-bootstrap-icons";
import "../../App.css";

const DDetail = ({ match }) => {
  const [dramaTitle, setDramaTitle] = useState([]);
  const [dramaImage, setDramaImage] = useState([]);
  const [dramaOverview, setDramaOverview] = useState([]);
  const [dramaRated, setDramaRated] = useState([]);
  const [dramaGenre, setDramaGenre] = useState([]);
  const [dramaRuntime, setDramaRuntime] = useState([]);
  const [dramaLanguage, setDramaLanguage] = useState([]);
  const [videoKey, setVideoKey] = useState([]);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  var dramaAPI1, dramaAPI2;

  var dramaGenreArray = new Array();
  var dramaLanguageArray = new Array();

  var getDramaTitle,
    getDramaImage,
    getDramaOverview,
    getDramaRated,
    getDramaGenre,
    getDramaRuntime,
    getDramaLanguage,
    getVideoKey;

    const fetchVideo = async (id) => {
      dramaAPI1 = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${TMDB_API_KEY}`;
  
      await axios.get(dramaAPI1).then((response) => {
        getVideoKey = response.data.results[0]?.key;
      });
  
      setVideoKey(getVideoKey);
    };

  const fecthData = async (id) => {
    dramaAPI1 = `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}`;

    axios.get(dramaAPI1).then((response) => {
      getDramaTitle = response.data.name;
      getDramaImage = response.data.poster_path;
      getDramaOverview = response.data.overview;
      getDramaRuntime = response.data.episode_run_time[0] + " min";

      for (var i = 0; i < response.data.genres.length; i++) {
        dramaGenreArray[i] = JSON.stringify(
          response.data.genres[i].name
        ).replace(/"/g, "");
      }

      getDramaGenre = dramaGenreArray.join(", ");

      for (var i = 0; i < response.data.spoken_languages.length; i++) {
        dramaLanguageArray[i] = JSON.stringify(
          response.data.spoken_languages[i].english_name
        ).replace(/"/g, "");
      }

      getDramaLanguage = dramaLanguageArray.join(", ");

      dramaAPI2 = `https://www.omdbapi.com/?t=${getDramaTitle}&type=series&apikey=${OMDB_API_KEY}`;

      axios.get(dramaAPI2).then((response) => {
        getDramaRated = response.data.Rated || "N/A";
        getDramaGenre = response.data.Genre || `${getDramaGenre}` || "N/A";
        getDramaRuntime = response.data.Runtime ||  `${getDramaRuntime}`;
        getDramaLanguage = response.data.Language || `${getDramaLanguage}`;

        setDramaTitle(getDramaTitle);
        setDramaImage(getDramaImage);
        setDramaRated(getDramaRated);
        setDramaGenre(getDramaGenre);
        setDramaRuntime(getDramaRuntime)
        setDramaLanguage(getDramaLanguage);
        setDramaOverview(getDramaOverview);
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
            <img src={dramaImage ? `${img_300}${dramaImage}` : unavailable} />
          </div>
        </div>
        <div class="d-flex align-items-center me-md-3">
          <div class="my-3">
            <h3>{dramaTitle}</h3>
            <span>
              {dramaRated}&emsp;
              {dramaGenre}&ensp;&#9679;&ensp;
              {dramaRuntime}&ensp;&#9679;&ensp;
              {dramaLanguage}
            </span>
            <h4 class="pt-3">Overview</h4>
            <p>{dramaOverview}</p>
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

export default DDetail;
