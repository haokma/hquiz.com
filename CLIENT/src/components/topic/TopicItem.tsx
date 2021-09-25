import { NextPage } from 'next';
import { Topic } from '../../interfaces';
import Link from 'next/link';
interface Props {
  topic: Topic;
}

const TopicItem: NextPage<Props> = (props: Props) => {
  const { topic } = props;

  return (
    <Link href={`/de-thi/${topic._id}`}>
      <div className="topic-item">
        <div className="topic-img">
          <img src={topic.image} alt="" />
        </div>
        <div className="topic-right">
          <h5 className="topic-title">{topic.title}</h5>
          <div className="topic-info">
            <div>
              <span>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </span>
              <span>{topic.totalQuestion} câu</span>
            </div>
            <div>
              <span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                  <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                </svg>
              </span>
              <span>{topic.time}:00</span>
            </div>
            <div>
              <span>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </span>
              <span>{topic.view}</span>
            </div>
          </div>
          {/* <p className="topic-categories">Pythons</p> */}
        </div>
      </div>
    </Link>
  );
};

export default TopicItem;
