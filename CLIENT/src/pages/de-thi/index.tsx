import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TopicItem from '../../components/topic/TopicItem';
import data from '../../data/topic.json';

const Topic: NextPage = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="topic">
      <div className={isActive ? 'sidebar active' : 'sidebar'}></div>
      <div className={isActive ? 'modal active' : 'modal'} onClick={() => setIsActive(false)}></div>
      <div className={isActive ? 'topic-left active' : 'topic-left'}></div>
      <div className="topic-wrap">
        <div className="topic-content">
          <div className="topic-heading">
            <ul className="topic-break">
              <li>
                <Link href="/">HQUIZ</Link>
              </li>
              <li className="arrow">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
                  ></path>
                </svg>
              </li>
              <li>
                <Link href="/">Đề thi</Link>
              </li>
            </ul>
            <div className="topic-toggle">
              <button onClick={() => setIsActive(!isActive)}>Bộ lọc</button>
            </div>
          </div>
          <div className="topic-list">
            <div className="row">
              {data.topic.map((item, index) => {
                return (
                  <div className="col-xl-6">
                    <TopicItem topic={item} key={index} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
