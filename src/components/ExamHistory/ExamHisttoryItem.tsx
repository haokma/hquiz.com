import { ShareSvg } from '../common/Svg';
import Link from 'next/link';
import { format } from 'date-fns';

interface EXAMHISTORYITEMPROPS {
  historyItem: any;
}

const ExamHistoryItem = (props: EXAMHISTORYITEMPROPS) => {
  const { historyItem } = props;

  return (
    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pb-4">
      <Link href={`attempt/ket-qua/${historyItem.topicId}`}>
        <div className="exam-history-item">
          <h4 className="exam-history-item-title">{historyItem.topicName}</h4>
          <div className="exam-history-item-main">
            <div className="exam-history-item-result">
              <span>{historyItem.totalSuccess}</span>
              <span>/</span>
              <span>20</span>
            </div>
            <div className="exam-history-item-time">
              <span>Ngày thi</span>
              <span>
                {format(new Date(historyItem.createdAt), 'yyyy-MM-dd')}
              </span>
            </div>
          </div>
          <div className="exam-history-item-share">
            <ShareSvg />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExamHistoryItem;
