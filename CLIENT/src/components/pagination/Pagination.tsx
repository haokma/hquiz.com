import { NextPage } from 'next';
import { useState } from 'react';
const TOTAL_PAGE = 25;
const SHOW_PAGE = 5;

const Pagination: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const diff = Math.floor(SHOW_PAGE / 2);
  let beforePage = Math.max(currentPage - diff, 0);
  let afterPage = Math.min(SHOW_PAGE + beforePage, TOTAL_PAGE);

  if (TOTAL_PAGE >= SHOW_PAGE && afterPage >= TOTAL_PAGE) {
    beforePage = TOTAL_PAGE - SHOW_PAGE;
  }
  function renderPagination(beforePage: number, afterPage: number) {
    const results = [];
    results.push(
      <li key={0}>
        <button
          className="prev btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <i className="bx bx-left-arrow-alt"></i>
        </button>
      </li>
    );
    for (let i = beforePage; i < afterPage; i++) {
      results.push(
        <li
          key={i}
          className={currentPage === i ? 'number active' : 'number'}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </li>
      );
    }
    results.push(
      <li key={TOTAL_PAGE + 1}>
        <button
          className="next btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage + 1 === TOTAL_PAGE}
        >
          <i className="bx bx-right-arrow-alt"></i>
        </button>
      </li>
    );
    return results;
  }

  return (
    <div className="pagination">
      <ul>{renderPagination(beforePage, afterPage)}</ul>
    </div>
  );
};

export default Pagination;
