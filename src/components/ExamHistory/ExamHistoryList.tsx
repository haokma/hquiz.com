import TopicItemSkeletion from '../common/Skeleton/TopicItemSkeletion';
import ExamHistoryItem from './ExamHisttoryItem';

interface EXAMHISTORYLIST {
  examHistoryList: any;
  isLoading: boolean;
}

const ExamHistoryList = (props: EXAMHISTORYLIST) => {
  const { examHistoryList, isLoading } = props;

  return (
    <div className="exam-history-list">
      <div className="row margin-0">
        {!isLoading && examHistoryList.length ? (
          <>
            {examHistoryList.map((item: any, index: number) => (
              <ExamHistoryItem historyItem={item} key={index} />
            ))}
          </>
        ) : null}
        {isLoading ? (
          <>
            {Array.from(Array(6).keys()).map((item: number, index: number) => (
              <div
                className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pb-4"
                key={index}
              >
                <TopicItemSkeletion />
              </div>
            ))}
          </>
        ) : null}
        {!isLoading && !examHistoryList.length ? (
          <>
            <div className="topic-empty">
              <span>Hiện không có đề thi nào phù hợp!</span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ExamHistoryList;
