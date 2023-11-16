import { useState } from "react";
import { PropTypes } from "prop-types";

function SearchBox({ setValue, setOrder }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleClickOrder(event) {
    const value = event.target.innerHTML;
    setOrder(value);
  }

  return (
    <div className="Search__Flex">
      <input
        className="Search__Input"
        type="text"
        placeholder="Enter what you want"
        onChange={(event) => {
          const value = event.target.value;
          setValue(value);
        }}
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
      {isMenuOpen && (
        <ul className="Menu__ul">
          <li className="Menu__li" onClick={handleClickOrder}>
            latest
          </li>
          <li className="Menu__li" onClick={handleClickOrder}>
            relevant
          </li>
        </ul>
      )}
    </div>
  );
}

SearchBox.propType = {
  setValue: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default SearchBox;
