import { useEffect, useState } from "react";
import "./FavoritePage.css";
import ClickedImg from "../SearchPage/components/ClickedImg/ClickedImg";

function FavoritePage() {
  const [isClicked, setIsClicked] = useState();
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

  function setSavedImg() {
    return (
      <div className="Api__Flex__Img">
        {savedImages.map((img) => {
          return (
            <div key={img.id} className="Favorite__Api__Frame">
              <img className="Api__Img" src={img.url} alt={img.description} />
              <h3 className="Hover__Description">{img.description}</h3>
              <div className="Hover__Bar__Img">
                <img
                  className="Bar__Img"
                  src="download.png"
                  alt="download"
                  draggable="false"
                  onClick={() => handleDownload(img.url, img.description)}
                />
                <img
                  className="Bar__Img"
                  src={"after_saving.png"}
                  alt="after_saving"
                  draggable="false"
                  onClick={() => setLocalStorage(img.id)}
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
                <ClickedImg img_url={img.url} setIsClicked={setIsClicked} />
              )}
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
