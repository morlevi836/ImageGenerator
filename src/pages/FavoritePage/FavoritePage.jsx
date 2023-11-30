import { useState } from "react";
import "./FavoritePage.css";
import SearchApiImg from "../SearchPage/components/SearchApiImg/SearchApiImg";

function FavoritePage() {
  const [savedImages, setSavedImages] = useState(() => {
    return JSON.parse(localStorage.getItem("saved_img") || "[]");
  });

  return (
    <>
      {savedImages.length === 0 ? (
        <h1 className="Favorite__Title">You did not save any image</h1>
      ) : (
        <div className="Api__Flex__Img">
          {savedImages.map((img) => {
            return (
              <SearchApiImg
                key={img.id}
                img_id={img.id}
                img_url={img.url}
                img_description={img.description}
                savedImages={savedImages}
                setSavedImages={setSavedImages}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default FavoritePage;
