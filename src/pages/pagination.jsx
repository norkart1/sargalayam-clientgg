import React from "react";
import './style.css'

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="container pagination-container">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button prev-next"
      >
        Previous
      </button>

      {currentPage > 3 && (
        <>
          <button onClick={() => handleClick(1)} className="pagination-button">
            1
          </button>
          {currentPage > 4 && <span className="dots">...</span>}
        </>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <span className="dots">...</span>}
          <button
            onClick={() => handleClick(totalPages)}
            className="pagination-button"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button prev-next"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
