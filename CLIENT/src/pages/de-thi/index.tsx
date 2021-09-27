import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import TopicItemSkeletion from '../../components/common/Skeleton/topicItemSkeletion';
import PaginationUltimate from '../../components/pagination/PaginationUltimate';
import Sidebar from '../../components/topic/Sidebar';
import TopicItem from '../../components/topic/TopicItem';
import data from '../../data/topic.json';
import { Topic } from '../../interfaces';

let TOTAL_PAGE = 25;
let BOUNDARY = 2;
let SKIP = 1;
const TopicPage: NextPage = () => {
  const [isActive, setIsActive] = useState(true);
  const [topicType, setTopicType] = useState<any>({});
  const [topicList, setTopicList] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      } else {
        BOUNDARY = 2;
      }
    });
  }, []);

  useEffect(() => {
    const getTopic = () => {
      return new Promise((resolve, reject) => {
        const result = data.topic.filter((item) => item.typeId === topicType._id);
        setTimeout(() => {
          if (!topicType._id) {
            resolve(data.topic);
            return;
          }
          resolve(result);
        }, 2000);
      });
    };
    setIsLoading(true);
    getTopic().then((res: any) => {
      setIsLoading(false);
      setTopicList(res);
    });
  }, [topicType._id]);
  return (
    <>
      <Head>
        <title>Bộ đề thi trắc nghiệm THPT Quốc Gia mới nhất</title>
      </Head>
      <div className="topic">
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
              <div className="row margin-0">
                {!isLoading ? (
                  <>
                    {topicList.map((item, index) => {
                      return (
                        <div className="col-xl-6 col-lg-6 col-sm-12 pb-4" key={index}>
                          <TopicItem topic={item} />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {Array.from(new Array(6)).map((item, index) => {
                      return (
                        <div className="col-xl-6 col-lg-6 col-sm-12 pb-4" key={index}>
                          <TopicItemSkeletion />
                        </div>
                      );
                    })}
                  </>
                )}
                {!isLoading && !topicList.length ? (
                  <div className="topic-empty">
                    <span>Hiện không có đề thi nào phù hợp!</span>
                  </div>
                ) : null}
              </div>
            </div>
            {!isLoading && topicList.length ? (
              <div className="topic-pagination">
                <PaginationUltimate TOTAL_PAGE={TOTAL_PAGE} BOUNDARY={BOUNDARY} SKIP={SKIP} />
              </div>
            ) : null}
          </div>
        </div>
        <div className={isActive ? 'sidebar active' : 'sidebar'}>
          <Sidebar topicType={topicType} setTopicType={setTopicType} />
        </div>
        <div className={isActive ? 'topic-left active' : 'topic-left'}></div>
      </div>
    </>
  );
};

export default TopicPage;
