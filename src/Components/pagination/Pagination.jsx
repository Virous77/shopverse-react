import React from "react";
import { useState } from "react";
import "../../styles/Pagination.css";

const Pagination = ({ productPage, totalProducts, setCurrent, current }) => {
  const pageNumber = [];
  const pageNumberLimit = 5;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const totalPages = totalProducts / productPage;

  for (let i = 1; i <= Math.ceil(totalProducts / productPage); i++) {
    pageNumber.push(i);
  }

  const paginate = (pageNumbers) => {
    setCurrent(pageNumbers);
  };

  const paginateNext = () => {
    setCurrent(current + 1);
    if (current + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrev = () => {
    setCurrent(current - 1);

    if ((current - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <ul className="pagination">
      <li
        onClick={paginatePrev}
        className={current === pageNumber[0] ? "hide" : null}
      >
        Prev
      </li>

      {pageNumber.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              style={{ color: "black" }}
              key={number}
              onClick={() => paginate(number)}
              className={current === number ? "active" : ""}
            >
              {number}
            </li>
          );
        }
      })}

      <li
        onClick={paginateNext}
        className={
          current === pageNumber[pageNumber.length - 1] ? "hide" : null
        }
      >
        Next
      </li>
      <p>
        <b>{`page ${current}`}</b>
        <span> of </span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
