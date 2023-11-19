import { PropTypes } from "prop-types";
import { useState } from "react";

function HoverImg({
  imageExists,
  setLocalStorage,
  img_id,
  img_url,
  img_description,
}) {
  const [isClicked, setIsClicked] = useState("");

  return (
    <>
      <h3 className="Api__Description">{img_description}</h3>
      <div className="Api__Flex__Img">
        <img
          className="Save__Img"
          src={imageExists ? "after_saving.png" : "before_saving.png"}
          alt="saveImg"
          draggable="false"
          onClick={() => setLocalStorage(img_id, img_url, img_description)}
        />
        <img
          className="ZoomIn__Img"
          src="zoom-in.png"
          alt="zoom_in"
          draggable="false"
          onClick={() => isClicked === "" && setIsClicked(img_id)}
        />
      </div>
      {isClicked === img_id && {}}
    </>
  );
}

HoverImg.propTypes = {
  imageExists: PropTypes.bool,
  setLocalStorage: PropTypes.func,
  img_id: PropTypes.string,
  img_url: PropTypes.string,
  img_description: PropTypes.string,
  setIsClicked: PropTypes.func,
  isClicked: PropTypes.string,
};

export default HoverImg;
