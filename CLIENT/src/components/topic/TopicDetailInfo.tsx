import { Topic } from 'src/interfaces';
import { formatTime } from 'src/utils';
import { PlaySvg, QuestionSvg, TimeSvg, ViewSvg } from '../svg';
import Link from 'next/link';

interface PROPS {
  topic: any;
  slug: string;
}

export const TopicDetailsInfo = (props: PROPS) => {
  const { topic, slug } = props;

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
          <Link href={`/attempt/${slug}`}>
            <a>
              <PlaySvg />
              <span>Bắt đầu thi</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
