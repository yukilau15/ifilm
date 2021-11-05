import { img_500, unavailable } from "../config/config";
import { Link } from "react-router-dom";
import "../App.css";

const Slideshow = ({ id, title, image, media }) => {
  return (
      <img src={image ? `${img_500}${image}` : unavailable} style={{width: "100%"}}/>
  );
};

export default Slideshow;
