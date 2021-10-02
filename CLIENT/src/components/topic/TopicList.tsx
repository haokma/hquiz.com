import { Dispatch } from 'react';
import { FILTERCATEGORY, Topic } from 'src/interfaces';
import TopicItemSkeletion from '../common/Skeleton/topicItemSkeletion';
import Pagination from '../pagination/Pagination';
import TopicItem from './TopicItem';

interface PROPS {
  setIsActive: Dispatch<boolean>;
  isActive: boolean;
  isLoading: boolean;
  topicList: Topic[];
  totalPage: number;
  setFilter: Dispatch<FILTERCATEGORY>;
  filter: FILTERCATEGORY;
}

export const TopicList = (props: PROPS) => {
  const {
    isLoading,
    topicList,
    isActive,
    setIsActive,
    totalPage,
    setFilter,
    filter,
  } = props;
  return (
    <div className="topic-wrap">
      <div className="topic-content">
        <div className="topic-heading">
          <div className="topic-toggle">
            <button onClick={() => setIsActive(!isActive)}>Bộ lọc</button>
          </div>
        </div>
        <div className="topic-list">
          <div className="row margin-0">
            {!isLoading ? (
              <>
                {topicList.map((item, index) => {
                  return (
                    <div
                      className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pb-4"
                      key={index}
                    >
                      <TopicItem topic={item} />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {Array.from(new Array(6)).map((item, index) => {
                  return (
                    <div
                      className="col-xl-6 col-lg-6 col-sm-12 pb-4"
                      key={index}
                    >
                      <TopicItemSkeletion />
                    </div>
                  );
                })}
              </>
            )}
            {!isLoading && !topicList.length ? (
              <div className="topic-empty">
                <span>Hiện không có đề thi nào phù hợp!</span>
              </div>
            ) : null}
          </div>
        </div>
        {!isLoading && topicList.length ? (
          <div className="topic-pagination">
            <Pagination
              TOTAL_PAGE={totalPage}
              SHOW_PAGE={5}
              PAGE={filter.page}
              SET_PAGE={setFilter}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
