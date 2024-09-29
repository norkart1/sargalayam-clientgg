import React, { useState } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ margin: "0 5px" }}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handleClick(index + 1)}
          style={{
            margin: "0 5px",
            fontWeight: currentPage === index + 1 ? "bold" : "normal",
          }}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ margin: "0 5px" }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;