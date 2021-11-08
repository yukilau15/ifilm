import axios from "axios";
import { useState, useEffect } from "react";
import { img_300, unavailable } from "../../config/config";
import NavBar from "../../components/navbar";
import * as Icon from "react-bootstrap-icons";
import "../../App.css";

const DDetail = ({ match }) => {
  const [dramaID, setDramaID] = useState([]);
  const [dramaTitle, setDramaTitle] = useState([]);
  const [dramaImage, setDramaImage] = useState([]);
  const [dramaImageLandscape, setDramaImageLandscape] = useState([]);
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

  var getDramaID,
    getDramaTitle,
    getDramaImage,
    getDramaImageLandscape,
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
      getDramaID = response.data.id;
      getDramaTitle = response.data.name;
      getDramaImage = response.data.poster_path;
      getDramaImageLandscape = response.data.backdrop_path;
      getDramaOverview = response.data.overview;
      getDramaRuntime = response.data.episode_run_time[0] + " min";

      for (var i = 0; i < response.data.genres.length; i++) {
        dramaGenreArray[i] = JSON.stringify(
          response.data.genres[i].name
        ).replace(/"/g, "");
      }

      getDramaGenre = dramaGenreArray.join(", ");

      for (var j = 0; j < response.data.spoken_languages.length; j++) {
        dramaLanguageArray[j] = JSON.stringify(
          response.data.spoken_languages[j].english_name
        ).replace(/"/g, "");
      }

      getDramaLanguage = dramaLanguageArray.join(", ");

      dramaAPI2 = `https://www.omdbapi.com/?t=${getDramaTitle}&type=series&apikey=${OMDB_API_KEY}`;

      axios.get(dramaAPI2).then((response) => {
        getDramaRated = response.data.Rated || "N/A";
        getDramaGenre = response.data.Genre || `${getDramaGenre}` || "N/A";
        getDramaRuntime = response.data.Runtime || `${getDramaRuntime}`;
        getDramaLanguage = response.data.Language || `${getDramaLanguage}`;

        setDramaID(getDramaID);
        setDramaTitle(getDramaTitle);
        setDramaImage(getDramaImage);
        setDramaImageLandscape(getDramaImageLandscape);
        setDramaRated(getDramaRated);
        setDramaGenre(getDramaGenre);
        setDramaRuntime(getDramaRuntime);
        setDramaLanguage(getDramaLanguage);
        setDramaOverview(getDramaOverview);
      });
    });
  };

  const save = (id) => {
    const fid = id;
    const ftitle = dramaTitle;
    const fimage = dramaImageLandscape;
    const ftype = "tv";
    const foverview = dramaOverview;

    axios
      .post("/films/add", { fid, ftitle, fimage, ftype, foverview })
      .then(() => alert("Add successfully!"));
  };

  useEffect(() => {
    fecthData(match.params.id);
    fetchVideo(match.params.id);
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="d-md-flex flex-md-equal w-100">
          <div className="me-md-3">
            <div className="my-3">
              <img
                className="img"
                src={dramaImage ? `${img_300}${dramaImage}` : unavailable}
              />
            </div>
          </div>
          <div className="d-flex align-items-center me-md-3">
            <div className="my-3">
              <h3>{dramaTitle}</h3>
              <span>
                {dramaRated}&emsp;
                {dramaGenre}&ensp;&#9679;&ensp;
                {dramaRuntime}&ensp;&#9679;&ensp;
                {dramaLanguage}
              </span>
              <h4 className="pt-3">Overview</h4>
              <p>{dramaOverview}</p>
              <a
                className="btn btn-secondary me-md-3"
                target="_blank"
                href={`https://www.youtube.com/watch?v=${videoKey}`}
              >
                <span>
                  <Icon.PlayFill /> Play Trailer
                </span>
              </a>
              <button
                type="button"
                className="btn btn-secondary me-md-3"
                onClick={() => save(dramaID)}
              >
                <span>
                  <Icon.Bookmark />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DDetail;
