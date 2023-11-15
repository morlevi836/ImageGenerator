import { useEffect, useState } from "react";
import "./FavoritePage.css";

function FavoritePage() {
  const [savedImages, setSavedImages] = useState(() => {
    return JSON.parse(localStorage.getItem("saved_img") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("saved_img", JSON.stringify(savedImages));
  }, [savedImages]);

  function setLocalStorage(id) {
    const filterArr = savedImages.filter((imgFilter) => imgFilter.id !== id);
    setSavedImages(filterArr);
  }

  function setSavedImg() {
    return (
      <div className="Grid__Img">
        {savedImages.map((img) => {
          return (
            <div key={img.id} className="Api__Frame">
              <img className="Api__Img" src={img.url} alt={img.description} />
              <h3 className="Api__Description">{img.description}</h3>
              <img
                className="Save__Img"
                src={"after_saving.png"}
                alt="after_saving"
                draggable="false"
                onClick={() => setLocalStorage(img.id)}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {savedImages.length === 0 ? (
        <h1 className="Favorite__Title">You did not save any image</h1>
      ) : (
        setSavedImg()
      )}
    </>
  );
}

export default FavoritePage;
