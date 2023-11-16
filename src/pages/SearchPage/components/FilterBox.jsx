import { PropTypes } from "prop-types";

function FilterBox({ setNumPage, setContentFilter, setColor }) {
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
          className="Filter__Input"
          type="number"
          min="1"
          max="30"
          id="Filter__ImagePerPage"
          onChange={handleChange}
        />
      </div>
      <div className="Filter__Div">
        <label className="Filter__Label">Content Filter:</label>
        <select
          className="Filter__Select"
          id="Filter__ContentFilter"
          onChange={handleChange}
        >
          <option className="Filter__Option">low</option>
          <option className="Filter__Option">high</option>
        </select>
      </div>
      <div className="Filter__Div">
        <label className="Filter__Label">Color:</label>
        <select
          className="Filter__Select"
          id="Filter__Color"
          onChange={handleChange}
        >
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
  );
}

FilterBox.propTypes = {
  setNumPage: PropTypes.func.isRequired,
  setContentFilter: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
};

export default FilterBox;
