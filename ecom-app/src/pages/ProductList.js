import React, { useEffect, useState } from "react";
import { Filter } from "../filters/Filters";
import { ProductCard } from "../components/ProductCard";
import { Search } from "../components/Search";
import "./ProductList.css"; // Import the CSS file

export default function ProductList({ products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterState, setFilterState] = useState({
    maxPrice: 2000,
    rating: 0,
    sortOrder: ""
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const handleSortOrder = (order) => {
    setFilterState((prevState) => ({
      ...prevState,
      sortOrder: order
    }));
  };

  const handlePriceFilter = (value) => {
    setFilterState((prevState) => ({
      ...prevState,
      maxPrice: value
    }));
  };

  const handleRatingFilter = (value) => {
    setFilterState((prevState) => ({
      ...prevState,
      rating: value
    }));
  };

  useEffect(() => {
    const filterByPrice = (product) => {
      return product.price <= filterState.maxPrice;
    };

    const filterByRating = (product) => {
      return product.rating >= filterState.rating;
    };

    const sortProducts = (a, b) => {
      if (filterState.sortOrder === "asc") {
        return a.price - b.price;
      } else if (filterState.sortOrder === "desc") {
        return b.price - a.price;
      }
      return 0;
    };

    const filteredProducts = products
      .filter(filterByPrice)
      .filter(filterByRating)
      .filter((product) => {
        const title = product.title.toLowerCase();
        return (
          searchKeyword === "" || title.includes(searchKeyword.toLowerCase())
        );
      })
      .sort(sortProducts);

    setFilteredProducts(filteredProducts);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [products, filterState, searchKeyword]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const renderProducts = currentProducts.map((product) => (
    <ProductCard key={product._id} {...product} />
  ));

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Generate array of page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div>
      <Search
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      <div className="FilterContainer">
        <Filter
          handleSortOrder={handleSortOrder}
          handlePriceFilter={handlePriceFilter}
          handleRatingFilter={handleRatingFilter}
        />
      </div>

      <div className="ProductGridContainer">{renderProducts}</div>

      {totalPages > 1 && (
        <div className="Pagination">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
