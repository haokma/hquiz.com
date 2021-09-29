import { useState } from 'react';
import { LIMIT } from '../../constants';

interface PROPS {
  TOTAL_PAGE: number;
  SHOW_PAGE: number;
  PAGE: number;
  SET_PAGE: any;
}

const Pagination = (props: PROPS) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { TOTAL_PAGE, SHOW_PAGE, PAGE, SET_PAGE } = props;

  const diff = Math.floor(SHOW_PAGE / 2);
  let beforePage = Math.max(PAGE - diff, 0);
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
          onClick={() =>
            SET_PAGE({
              limit: LIMIT,
              page: PAGE + 1,
            })
          }
          disabled={PAGE === 1}
        >
          <i className="bx bx-left-arrow-alt"></i>
        </button>
      </li>
    );
    for (let i = beforePage; i < afterPage; i++) {
      results.push(
        <li
          key={i}
          className={PAGE - 1 === i ? 'number active' : 'number'}
          onClick={() =>
            SET_PAGE({
              limit: LIMIT,
              page: i + 1,
            })
          }
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
          disabled={PAGE === TOTAL_PAGE}
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
