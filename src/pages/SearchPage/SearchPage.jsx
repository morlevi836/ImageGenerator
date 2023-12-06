import { useEffect, useState } from "react";
import "./SearchPage.css";
import SearchBox from "./components/SearchBox/SearchBox";
import FilterBox from "./components/FilterBox/FilterBox";
import SearchApiImg from "./components/SearchApiImg/SearchApiImg";
import Loading from "../Loading/Loading";

function SearchPage() {
  const [value, setValue] = useState("sky");
  const [order, setOrder] = useState("relevant");
  const [images, setImages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [numPage, setNumPage] = useState("10");
  const [contentFilter, setContentFilter] = useState("low");
  const [color, setColor] = useState("white");
  const [savedImages, setSavedImages] = useState(() => {
    return JSON.parse(localStorage.getItem("saved_img") || "[]");
  });

  // const state = useLocation();

  useEffect(() => {
    const ACCESS_KEY = import.meta.env.VITE_API_KEY;
    const fetchImg = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com//search/photos?client_id=${ACCESS_KEY}&query=${value}&per_page=${numPage}&order_by=${order}&content_filter=${contentFilter}&color=${color}`
        );
        const result = await response.json();
        setImages(result.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchImg();
  }, [value, numPage, order, contentFilter, color]);

  return (
    <>
      <SearchBox setValue={setValue} setOrder={setOrder} />
      <FilterBox
        numPage={numPage}
        setNumPage={setNumPage}
        setContentFilter={setContentFilter}
        setColor={setColor}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="Api__Flex__Img">
          {images.map((img) => {
            return (
              <SearchApiImg
                key={img.id}
                img_id={img.id}
                img_url={img.urls.small}
                img_description={img.alt_description}
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
export default SearchPage;
