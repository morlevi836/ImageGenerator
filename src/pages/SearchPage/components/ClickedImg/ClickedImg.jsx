import { PropTypes } from "prop-types";
import "./ClickedImg.css";

function ClickedImg({ img_url, setIsClicked }) {
  return (
    <>
      <div className="Zoom__overlay" onClick={() => setIsClicked(false)}>
        <img
          className="Zoom__Img"
          src={img_url}
          alt="img_url"
          draggable="false"
        />
        <img
          className="Close__Img"
          src="delete.png"
          alt="delete"
          draggable="false"
        />
      </div>
    </>
  );
}

ClickedImg.propTypes = {
  img_url: PropTypes.string,
  setIsClicked: PropTypes.func,
};

export default ClickedImg;
