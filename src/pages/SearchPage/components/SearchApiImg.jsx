import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";

function SearchApiImg({ images }) {
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
    <div className="Grid__Img">
      {images.map((img) => {
        const imageExists = savedImages.find(
          (savedImg) => savedImg.id === img.id
        );
        return (
          <div key={img.id} className="Api__Frame">
            <img
              className="Api__Img"
              src={img.urls.small}
              alt={img.alt_description}
            />
            <h3 className="Api__Description">{img.alt_description}</h3>
            <img
              className="Save__Img"
              src={imageExists ? "after_saving.png" : "before_saving.png"}
              alt="saveImg"
              draggable="false"
              onClick={() =>
                setLocalStorage(img.id, img.urls.small, img.alt_description)
              }
            />
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
