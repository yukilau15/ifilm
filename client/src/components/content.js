import { img_300, unavailable } from "../config/config";
import { Link } from "react-router-dom";
import "../App.css";

const Content = ({ id, title, image, media }) => {
  return (
    <Link to={media == "tv" ? `/dramadetail/${id}`: `/moviedetail/${id}`} className="media">
      <img className="img" src={image ? `${img_300}${image}` : unavailable} />
      <p className="title">{title}</p>
    </Link>
  );
};

export default Content;
