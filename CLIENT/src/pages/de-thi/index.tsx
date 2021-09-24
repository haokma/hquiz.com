import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PaginationUltimate from '../../components/pagination/PaginationUltimate';
import Sidebar from '../../components/topic/Sidebar';
import TopicItem from '../../components/topic/TopicItem';
import data from '../../data/topic.json';

let TOTAL_PAGE = 25;
let BOUNDARY = 2;
let SKIP = 1;
const Topic: NextPage = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 1024) {
      setIsActive(false);
    }
    if (width < 576) {
      BOUNDARY = 1;
    }
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      if (width < 1024 && isActive) {
        setIsActive(false);
      }
      if (width < 576) {
        BOUNDARY = 1;
      }
    });
  }, []);
  return (
    <>
      <Head>
        <title>Bộ đề thi trắc nghiệm THPT Quốc Gia mới nhất</title>
      </Head>
      <div className="topic">
        <div className={isActive ? 'sidebar active' : 'sidebar'}>
          <Sidebar />
        </div>
        <div
          className={isActive ? 'modal active' : 'modal'}
          onClick={() => setIsActive(false)}
        ></div>

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
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
                    ></path>
                  </svg>
                </li>
                <li>
                  <Link href="/de-thi">Đề thi</Link>
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
                    <div className="col-xl-6 col-lg-6 pb-4" key={index}>
                      <TopicItem topic={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="topic-pagination">
            <PaginationUltimate TOTAL_PAGE={TOTAL_PAGE} BOUNDARY={BOUNDARY} SKIP={SKIP} />
          </div>
        </div>
        <div className={isActive ? 'topic-left active' : 'topic-left'}></div>
      </div>
    </>
  );
};

export default Topic;
