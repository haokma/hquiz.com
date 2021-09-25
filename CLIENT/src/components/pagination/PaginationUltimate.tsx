import { useState } from 'react';

const NUMBER = 2;

interface PROPS {
  TOTAL_PAGE: number;
  BOUNDARY: number;
  SKIP: number;
}

export default function PaginationUltimate(props: PROPS) {
  const [currentPage, setCurrentPage] = useState(1);
  const { TOTAL_PAGE, BOUNDARY, SKIP } = props;

  let beforePage = currentPage - SKIP;
  let afterPage = currentPage + SKIP;

  function paginationItem(currentPage: number, index: number) {
    return (
      <li
        className={index === currentPage ? 'active' : ''}
        key={index}
        onClick={() => setCurrentPage(index)}
      >
        {index}
      </li>
    );
  }
  function renderPagination() {
    const results = [];

    if (currentPage < BOUNDARY + NUMBER) {
      for (let i = 1; i <= BOUNDARY + NUMBER + SKIP * 2; i++) {
        results.push(paginationItem(currentPage, i));
      }
      results.push(<li key={Math.random()}>...</li>);
      for (let i = TOTAL_PAGE - BOUNDARY + 1; i <= TOTAL_PAGE; i++) {
        results.push(paginationItem(currentPage, i));
      }
    } else if (currentPage > TOTAL_PAGE - BOUNDARY - 1 - SKIP * 2) {
      for (let i = 1; i <= BOUNDARY; i++) {
        results.push(paginationItem(currentPage, i));
      }
      results.push(<li key={Math.random()}>...</li>);

      for (let i = TOTAL_PAGE - BOUNDARY - 1 - SKIP * 2; i <= TOTAL_PAGE; i++) {
        results.push(paginationItem(currentPage, i));
      }
    } else {
      for (let i = 1; i <= BOUNDARY; i++) {
        results.push(paginationItem(currentPage, i));
      }
      results.push(<li key={Math.random()}>...</li>);
      for (let i = beforePage; i <= afterPage; i++) {
        results.push(paginationItem(currentPage, i));
      }
      results.push(<li key={Math.random()}>...</li>);
      for (let i = TOTAL_PAGE - BOUNDARY + 1; i <= TOTAL_PAGE; i++) {
        results.push(paginationItem(currentPage, i));
      }
    }

    return results;
  }

  return (
    <>
      <ul className="paginationbest">
        <button
          className="btn prev"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <i className="bx bx-chevron-left"></i>
        </button>
        {renderPagination()}
        <button
          className="btn next"
          disabled={currentPage === TOTAL_PAGE}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <i className="bx bx-chevron-right"></i>
        </button>
      </ul>
    </>
  );
}
