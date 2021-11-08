import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const [id, setID] = useState([]);
  const history = useHistory();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get("users/session", { token });

    setID(data.user._id);
  };

  const signOut = () => {
    var message = window.confirm("Are you sure you want to quit?");

    const uid = id;

    if (message === true) {
      localStorage.removeItem("token");

      axios.post("users/delete/", { uid }).then((data) => {
        if (data.status === 200) {
          history.push("/");
        }
      });
    }
  };

  useEffect(() => {
    fetchUser();
  });

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
          <a
            href="/home"
            className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-white text-decoration-none"
          >
            iFilm
          </a>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="/dramas" className="nav-link px-2 text-white">
                Dramas
              </a>
            </li>
            <li>
              <a href="/movies" className="nav-link px-2 text-white">
                Movies
              </a>
            </li>
            <li>
              <a href="/profile" className="nav-link px-2 text-white">
                Profile
              </a>
            </li>
          </ul>

          <div className="col-md-3 text-end">
            <button className="btn btn-secondary" style={{ width: "105.12px" }} onClick={() => signOut()}>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
