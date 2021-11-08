import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Watchlist from "../components/watchlist";

const Profile = () => {
  const [films, setFilms] = useState([]);
  const [id, setID] = useState([]);
  const [name, setName] = useState([]);
  const [bio, setBio] = useState([]);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get("users/session", { token });

    setID(data.user._id);
    setName(data.user.name);

    /*axios
      .get("users/a", { token })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));*/

    //.then((res) => setProfile(res.data))
  };

  const fetchData = async () => {
    axios
      .get("films/all")
      .then((res) => setFilms(res.data))
      .catch((err) => console.log(err));
  };

  const removeAll = () => {
    var message = window.confirm("Are you sure you want to delete all fims?");

    if (message === true) {
      axios.delete("/films/deleteAll", { data: {} });
    }
  };

  const update = () => {
    const message = window.prompt("Please enter you bio:", "");

    setBio(message);

    const users = {
      bio,
    };

    axios.put(`users/update/${id}`, users);
  };

  useEffect(() => {
    fetchUser();
    fetchData();
  });

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-9">
            <h1 className="pt-3">Profile</h1>
          </div>
          <div className="col align-self-end pb-2">
            <button
              type="button"
              className="btn btn-secondary"
              style={{ float: "right", width: "105.12px" }}
              onClick={() => update()}
            >
              <span>Edit Bio</span>
            </button>
          </div>
        </div>
        <div className="card p-4" style={{ width: "100%" }}>
          <h4 className="text-black">{name}</h4>
          <p className="lead text-black">{bio}</p>
        </div>

        <div className="row">
          <div className="col-9">
            <h1 className="pt-3">My Watchlist</h1>
          </div>
          <div className="col align-self-end pb-2">
            <button
              type="button"
              className="btn btn-secondary"
              style={{ float: "right" }}
              onClick={() => removeAll()}
            >
              <span>Remove All</span>
            </button>
          </div>
        </div>
        <div className="wrap-content pb-3">
          {films.map((f) => (
            <Watchlist
              id={f.film_id}
              title={f.title}
              image={f.image}
              type={f.type}
              overview={f.overview}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
