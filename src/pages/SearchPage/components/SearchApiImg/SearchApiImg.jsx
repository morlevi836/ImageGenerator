import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import HoverImg from "../HoverImg/HoverImg";
import "./SearchApiImg.css";

function SearchApiImg({
  img_id,
  img_url,
  img_description,
  savedImages,
  setSavedImages,
}) {
  const [isClicked, setIsClicked] = useState();
  const [isHovered, setIsHovered] = useState("");
  const imageExists = savedImages.find((savedImg) => savedImg.id === img_id);

  useEffect(() => {
    localStorage.setItem("saved_img", JSON.stringify(savedImages));
  }, [savedImages]);

  function setLocalStorage(id, url, description) {
    const imgObj = { id: id, url: url, description: description };
    const imageExists = savedImages.find((img) => img.id === id);
    console.log(imageExists);
    console.log(savedImages);
    if (savedImages === "") {
      setSavedImages([imgObj]);
    } else {
      if (imageExists) {
        if (savedImages.length === 1) localStorage.clear();
        const filterArr = savedImages.filter(
          (imgFilter) => imgFilter.id !== id
        );
        setSavedImages(filterArr);
      } else {
        setSavedImages((prevImg) => [...prevImg, imgObj]);
      }
    }
  }

  return (
    <div
      className="Api__Frame"
      onMouseEnter={() => setIsHovered(img_id)}
      onMouseLeave={() => setIsHovered("")}
    >
      <img
        className={isHovered === img_id ? "Api__Img__Hover" : "Api__Img"}
        src={img_url}
        alt={img_description}
        draggable="false"
        onClick={() => setIsClicked(true)}
      />
      {isHovered === img_id && (
        <HoverImg
          imageExists={imageExists}
          setLocalStorage={setLocalStorage}
          img_id={img_id}
          img_url={img_url}
          img_description={img_description}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
      )}
    </div>
  );
}

SearchApiImg.propTypes = {
  img_id: PropTypes.string,
  img_url: PropTypes.string,
  img_description: PropTypes.string,
  savedImages: PropTypes.arr,
  setSavedImages: PropTypes.func,
};

export default SearchApiImg;
