import { PropTypes } from "prop-types";
import ClickedImg from "../ClickedImg/ClickedImg";
import "./HoverImg.css";

function HoverImg({
  imageExists,
  setLocalStorage,
  img_id,
  img_url,
  img_description,
  isClicked,
  setIsClicked,
}) {
  const handleDownload = async (img_url, img_description) => {
    try {
      const response = await fetch(img_url);
      const downloadImg = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(downloadImg);
      link.download = img_description;
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="Hover__Description">{img_description}</h3>
      <div className="Hover__Bar__Img">
        <img
          className="Bar__Img"
          src="download.png"
          alt="download"
          draggable="false"
          onClick={() => handleDownload(img_url, img_description)}
        />
        <img
          className="Bar__Img"
          src={imageExists ? "after_saving.png" : "before_saving.png"}
          alt="saveImg"
          draggable="false"
          onClick={() => setLocalStorage(img_id, img_url, img_description)}
        />
        <img
          className="Bar__Img"
          src="zoom-in.png"
          alt="zoom_in"
          draggable="false"
          onClick={() => setIsClicked(true)}
        />
      </div>
      {isClicked && (
        <ClickedImg img_url={img_url} setIsClicked={setIsClicked} />
      )}
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
  isClicked: PropTypes.bool,
};

export default HoverImg;
