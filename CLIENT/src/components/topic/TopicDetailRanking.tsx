import { RANKING } from 'src/interfaces';
import { formatTime } from 'src/utils';

interface TOPICDETAILRANKING {
  rankingList: RANKING[];
}

export const TopicDetailRanking = (props: TOPICDETAILRANKING) => {
  const { rankingList } = props;
  return (
    <div className="topic-details-ranking">
      <div>Bảng xếp hạng</div>
      <ul>
        <li className="head">
          <span>Tên</span>
          <span>Điểm thi</span>
          <span>Thời gian</span>
        </li>
        {rankingList.map((item: any, index: number) => (
          <li key={index}>
            <span>{item.username}</span>
            <span>{item.score}đ</span>
            <span>
              {formatTime(Math.floor(item.time / 60))}:
              {formatTime(item.time % 60)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
