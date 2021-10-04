import { NextPage } from 'next';
import Link from 'next/link';
import {
  QuestionSvg,
  TimeSvg,
  ViewSvg,
} from 'src/components/common/Svg';
import { TOPIC } from 'src/interfaces';
import { formatTime } from 'src/utils';
interface TOPICITEMPROPS {
  topic: TOPIC;
}

const TopicItem: NextPage<TOPICITEMPROPS> = (
  props: TOPICITEMPROPS
) => {
  const { topic } = props;

  return (
    <Link href={`/de-thi/${topic.slug}`}>
      <div className="topic-item">
        <div className="topic-img">
          <img src={topic.image} alt="" />
        </div>
        <div className="topic-right">
          <h5 className="topic-title">{topic.name}</h5>
          <div className="topic-info">
            <div>
              <QuestionSvg />
              <span>{topic.questionCount} câu</span>
            </div>
            <div>
              <TimeSvg />
              <span>
                {formatTime(topic.time / 60)}:
                {formatTime(topic.time % 60)}
              </span>
            </div>
            <div>
              <ViewSvg />
              <span>{topic.views}</span>
            </div>
          </div>
          {/* <p className="topic-categories">Pythons</p> */}
        </div>
      </div>
    </Link>
  );
};

export default TopicItem;
