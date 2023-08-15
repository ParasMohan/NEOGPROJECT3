import React, { useReducer } from "react";

const initialState = {
  maxPrice: 2000,
  rating: 0,
  sortOrder: "",
  category: "" // Add category property
};

function filterReducer(state, action) {
  switch (action.type) {
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload };
    case "SET_RATING":
      return { ...state, rating: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "SET_CATEGORY": // Add case for category
      return { ...state, category: action.payload };
    case "RESET_FILTERS":
      return initialState;
    default:
      throw new Error("Unsupported action type");
  }
}

export function Filter({
  handleSortOrder,
  handlePriceFilter,
  handleRatingFilter,
  handleCategoryFilter
}) {
  const [filterState, dispatch] = useReducer(filterReducer, initialState);

  const handleMaxPriceChange = (event) => {
    const value = Number(event.target.value);
    dispatch({ type: "SET_MAX_PRICE", payload: value });
    handlePriceFilter(value);
  };

  const handleRatingChange = (event) => {
    const value = Number(event.target.value);
    dispatch({ type: "SET_RATING", payload: value });
    handleRatingFilter(value);
  };

  const handleSortOrderChange = (order) => {
    dispatch({ type: "SET_SORT_ORDER", payload: order });
    handleSortOrder(order);
  };

  // const handleCategoryChange = (category) => {
  //   dispatch({ type: "SET_CATEGORY", payload: category });
  //   handleCategoryFilter(category);
  // };

  const handleResetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
    handleSortOrder("");
    handlePriceFilter(2000);
    handleRatingFilter(0);
    handleCategoryFilter(""); // Reset category filter as well
  };

  const { maxPrice, rating, sortOrder } = filterState;

  return (
    <div>
      <div>
        <label>
          Sort by price:
          <input
            type="radio"
            className="cursor-pointer"
            name="sortby-radio"
            id="Low-to-High-radio"
            value="asc"
            onChange={() => handleSortOrderChange("asc")}
            checked={sortOrder === "asc"}
          />
          Low to High
          <input
            type="radio"
            className="cursor-pointer"
            name="sortby-radio"
            id="High-to-Low-radio"
            value="desc"
            onChange={() => handleSortOrderChange("desc")}
            checked={sortOrder === "desc"}
          />
          High to Low
        </label>
      </div>
      <div>
        <label>
          Price range:
          <input
            type="range"
            name="maxPrice"
            min="0"
            max="2000"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <span className="blue">{maxPrice}</span>
        </label>
      </div>
      <div>
        <label>
          Rating:
          <input
            type="range"
            name="rating"
            min="0"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
          <span className="blue">{rating}</span>
        </label>
      </div>

      <button onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
}
