import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import HoverImg from "../HoverImg/HoverImg";
import "./SearchApiImg.css";

function SearchApiImg({ images }) {
  const [isClicked, setIsClicked] = useState();
  const [isHovered, setIsHovered] = useState("");
  const [savedImages, setSavedImages] = useState(() => {
    return JSON.parse(localStorage.getItem("saved_img") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("saved_img", JSON.stringify(savedImages));
  }, [savedImages]);

  function setLocalStorage(id, url, description) {
    const imgObj = { id: id, url: url, description: description };
    const imageExists = savedImages.find((img) => img.id === id);
    if (savedImages.length === 0) {
      setSavedImages([imgObj]);
    } else {
      if (imageExists) {
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
    <div className="Api__Flex__Img">
      {images.map((img) => {
        const imageExists = savedImages.find(
          (savedImg) => savedImg.id === img.id
        );
        return (
          <div
            key={img.id}
            className="Api__Frame"
            onMouseEnter={() => setIsHovered(img.id)}
            onMouseLeave={() => setIsHovered("")}
          >
            <img
              className={isHovered === img.id ? "Api__Img__Hover" : "Api__Img"}
              src={img.urls.small}
              alt={img.alt_description}
              draggable="false"
              onClick={() => setIsClicked(true)}
            />
            {isHovered === img.id && (
              <HoverImg
                imageExists={imageExists}
                setLocalStorage={setLocalStorage}
                img_id={img.id}
                img_url={img.urls.small}
                img_description={img.alt_description}
                isClicked={isClicked}
                setIsClicked={setIsClicked}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

SearchApiImg.propTypes = {
  images: PropTypes.array,
};

export default SearchApiImg;
