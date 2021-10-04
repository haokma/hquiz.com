import { Dispatch } from 'react';
import { LIMIT } from 'src/constants';
import { FILTERCATEGORY } from 'src/interfaces';

interface PAGINATIONPROPS {
  TOTAL_PAGE: number;
  SHOW_PAGE: number;
  PAGE: number;
  SET_PAGE: any;
  filter: FILTERCATEGORY;
  setFilter: Dispatch<any>;
}

const Pagination = (props: PAGINATIONPROPS) => {
  const { TOTAL_PAGE, SHOW_PAGE, PAGE, SET_PAGE, setFilter, filter } = props;

  const diff = Math.floor(SHOW_PAGE / 2);
  let beforePage = Math.max(PAGE - diff, 0);
  let afterPage = Math.min(SHOW_PAGE + beforePage, TOTAL_PAGE);

  if (TOTAL_PAGE >= SHOW_PAGE && afterPage >= TOTAL_PAGE) {
    beforePage = TOTAL_PAGE - SHOW_PAGE;
  }
  function renderPagination(beforePage: number, afterPage: number) {
    const results = [];
    results.push(
      <li key={TOTAL_PAGE + 2}>
        <button
          className="prev btn"
          onClick={() =>
            setFilter((prev: any) => ({
              ...prev,
              page: filter.page - 1,
            }))
          }
          disabled={filter.page === 1}
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
          onClick={() =>
            setFilter((prev: any) => ({
              ...prev,
              page: filter.page + 1,
            }))
          }
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
