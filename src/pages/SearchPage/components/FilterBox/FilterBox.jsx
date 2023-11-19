import { PropTypes } from "prop-types";
import "./FilterBox.css";

function FilterBox({ numPage, setNumPage, setContentFilter, setColor }) {
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

  function handleChange(event) {
    const { id, value } = event.target;
    switch (id) {
      case "Filter__ImagePerPage":
        setNumPage(value);
        break;
      case "Filter__ContentFilter":
        setContentFilter(value);
        break;
      case "Filter__Color":
        setColor(value);
        break;
    }
  }

  return (
    <div className="Filter__Flex">
      <div className="Filter__Div">
        <label className="Filter__Label">Image Per Page:</label>
        <input
          className="Filter__Bar"
          type="number"
          min="0"
          max="30"
          id="Filter__ImagePerPage"
          value={numPage}
          onChange={handleChange}
        />
      </div>
      <div className="Filter__Div">
        <label className="Filter__Label">Content Filter:</label>
        <select
          className="Filter__Bar"
          id="Filter__ContentFilter"
          onChange={handleChange}
        >
          <option>low</option>
          <option>high</option>
        </select>
      </div>
      <div className="Filter__Div">
        <label className="Filter__Label">Color:</label>
        <select
          className="Filter__Bar"
          id="Filter__Color"
          onChange={handleChange}
        >
          {colors.map((color, index) => {
            return <option key={index}>{color}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

FilterBox.propTypes = {
  numPage: PropTypes.string,
  setNumPage: PropTypes.func.isRequired,
  setContentFilter: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
};

export default FilterBox;
