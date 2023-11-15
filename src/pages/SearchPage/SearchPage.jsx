import { useEffect, useState } from "react";
import "./SearchPage.css";
import Loading from "../Loading/Loading";

function SearchPage() {
  const [value, setValue] = useState("blue");
  const [order, setOrder] = useState("relevant");
  const [images, setImages] = useState();
  const [loading, setLoading] = useState(true);
  const [numPage, setNumPage] = useState("9");
  const [contentFilter, setContentFilter] = useState("low");
  const [color, setColor] = useState("white");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const colors = [
    "black_and_white",
    "black",
    "white",
    "yellow",
    "orange",
    "red",
    "purple",
    "magenta",
    "green",
    "teal",
    "blue",
  ];
  const [savedImages, setSavedImages] = useState(() => {
    return JSON.parse(localStorage.getItem("saved_img") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("saved_img", JSON.stringify(savedImages));
  }, [savedImages]);

  useEffect(() => {
    const ACCESS_KEY = "2HQr19jFn8ASAPruLOoDcvqjPZY_lHV60lnTOc3kLko";
    const fetchImg = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com//search/photos?client_id=${ACCESS_KEY}&query=${value}&per_page=${numPage}&order_by=${order}&content_filter=${contentFilter}&color=${color}`
        );
        const result = await response.json();
        setImages(result.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImg();
  }, [value, numPage, order, contentFilter, color]);

  function searchApiImg() {
    return loading ? (
      <Loading />
    ) : (
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

  function handleChange(event) {
    const val = event.target.value;
    setValue(val);
  }

  function setMenuBar() {
    return (
      isMenuOpen && (
        <ul className="Menu__ul">
          <li className="Menu__li" onClick={handleClickOrder}>
            latest
          </li>
          <li className="Menu__li" onClick={handleClickOrder}>
            relevant
          </li>
        </ul>
      )
    );
  }

  function handleClickOrder(event) {
    const val = event.target.innerHTML;
    setOrder(val);
    setIsMenuOpen(false);
  }

  function handleChangeImagePerPage(event) {
    const val = event.target.value;
    setNumPage(val);
  }

  function handleChangeContentFilter(event) {
    const val = event.target.value;
    setContentFilter(val);
  }

  function handleChangeColor(event) {
    const val = event.target.value;
    setColor(val);
  }

  return (
    <>
      <div className="Search__Flex">
        <input
          className="Search__Input"
          type="text"
          placeholder="Enter what you want"
          onChange={handleChange}
        />
        <img
          className="Search__Img"
          src="SearchIcon.png"
          alt="SearchIcon"
          draggable="false"
        />
        <img
          className="Sort__Img"
          src="Sort-By.png"
          alt="Sort-By"
          draggable="false"
          onClick={() =>
            isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
          }
        />
        {setMenuBar()}
      </div>
      <div className="Filter__Flex">
        <div className="Filter__Div">
          <label className="Filter__Label">Image Per Page:</label>
          <input
            className="Filter__Input"
            type="number"
            min="1"
            max="30"
            onChange={handleChangeImagePerPage}
          />
        </div>
        <div className="Filter__Div">
          <label className="Filter__Label">Content Filter:</label>
          <select
            className="Filter__Select"
            onChange={handleChangeContentFilter}
          >
            <option className="Filter__Option">low</option>
            <option className="Filter__Option">high</option>
          </select>
        </div>
        <div className="Filter__Div">
          <label className="Filter__Label">Color:</label>
          <select className="Filter__Select" onChange={handleChangeColor}>
            {colors.map((color, index) => {
              return (
                <option key={index} className="Filter__Option">
                  {color}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {searchApiImg()}
    </>
  );
}
export default SearchPage;
