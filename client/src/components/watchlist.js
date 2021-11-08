import axios from "axios";
import { img_500, unavailable } from "../config/config";
import { Link } from "react-router-dom";
import "../App.css";

const Watchlist = ({ id, title, image, type, overview }) => {
  const MAX_LENGTH = 190;

  const remove = (id) => {
    const fid = id;

    axios
      .post("/films/delete", { fid })
      .then(() => alert("Delete successfully!"));
  };

  return (
    <div className="card mb-3" style={{ width: "100%" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            className="img1"
            src={image ? `${img_500}${image}` : unavailable}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <Link
              to={type === "tv" ? `/dramadetail/${id}` : `/moviedetail/${id}`}
            >
              <h5 className="text-black">{title}</h5>
            </Link>
            <p>
              <small className="text-muted">Media type: {type}</small>
            </p>
            <p className="text-black">{`${overview.substring(
              0,
              MAX_LENGTH
            )}...`}</p>
            <button
              type="button"
              className="btn btn-secondary me-md-3"
              onClick={() => remove(id)}
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
