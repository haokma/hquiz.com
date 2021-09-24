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
