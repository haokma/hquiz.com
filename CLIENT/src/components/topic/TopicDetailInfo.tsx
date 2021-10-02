import Link from 'next/link';
import { formatTime } from 'src/utils';
import { PlaySvg, QuestionSvg, TimeSvg, ViewSvg } from '../svg';

interface PROPS {
  topic: any;
  slug: string;
  startTopic: () => void;
}

export const TopicDetailsInfo = (props: PROPS) => {
  const { topic, slug, startTopic } = props;

  return (
    <div className="topic-details-info">
      <div className="topic-details-info-heading">
        <span>Thông tin đề thi</span>
      </div>
      <div className="topic-details-info-content">
        <p className="topic-details-description">{topic.description}</p>
        <div className="topic-info">
          <div>
            <QuestionSvg />
            <span>{topic.questionCount} câu</span>
          </div>
          <div>
            <TimeSvg />
            <span>
              {formatTime(topic.time / 60)}:{formatTime(topic.time % 60)}
            </span>
          </div>
          <div>
            <ViewSvg />
            <span>{topic.views}</span>
          </div>
        </div>
        <div className="topic-details-exam">
          <div onClick={() => startTopic()}>
            <a>
              <PlaySvg />
              <span>Bắt đầu thi</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
