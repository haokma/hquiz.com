import { NextPage } from 'next';
import Link from 'next/link';
import { Topic } from '../../interfaces';
import QuestionSvg from '../svg/questionSvg';
import TimeSvg from '../svg/time';
import ViewSvg from '../svg/viewSvg';
interface Props {
  topic: Topic;
}

const TopicItem: NextPage<Props> = (props: Props) => {
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
              <span>{topic.time.toString().slice(0, 2)}:00</span>
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
