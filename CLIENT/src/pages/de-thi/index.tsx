import Head from 'next/head';
import { useEffect, useState } from 'react';
import categoryApi from '../../apis/catgoryApi';
import topicApi from '../../apis/topicApi';
import TopicItemSkeletion from '../../components/common/Skeleton/topicItemSkeletion';
import Pagination from '../../components/pagination/Pagination';
import Sidebar from '../../components/topic/Sidebar';
import TopicItem from '../../components/topic/TopicItem';
import { LIMIT } from '../../constants';
import { Topic } from '../../interfaces';
import { CATEGORY, FILTERCATEGORY, TOPICTYPE } from '../../interfaces/category';

const TopicPage: any = () => {
  const [isActive, setIsActive] = useState(false);
  const [topicList, setTopicList] = useState<Topic[]>([]);
  const [categories, setCategories] = useState<CATEGORY[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [topicType, setTopicType] = useState<TOPICTYPE>({
    _id: '',
    name: '',
  });
  const [filter, setFilter] = useState<FILTERCATEGORY>({
    limit: LIMIT,
    page: 1,
    categoryId: '',
  });

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 1024) {
      setIsActive(false);
    }
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      if (width < 1024 && isActive) {
        setIsActive(false);
      }
    });
  }, []);

  useEffect(() => {
    const fetchTopic = async () => {
      setIsLoading(true);
      try {
        const res = await topicApi.getList(filter);
        const { topicList, pagination } = res.data;
        const { _total, _limit, _page } = pagination;

        setTotalPage(Math.ceil(_total / _limit));
        setTopicList(topicList);
        setFilter((prev) => ({
          ...prev,
          page: _page,
          limit: _limit,
        }));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchTopic();
  }, [filter.page, filter.categoryId]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await categoryApi.getList();

        setCategories(res.data.categories);
      } catch (error) {}
    };
    fetchCategory();
  }, []);
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
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pb-4" key={index}>
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
                <Pagination
                  TOTAL_PAGE={totalPage}
                  SHOW_PAGE={5}
                  PAGE={filter.page}
                  SET_PAGE={setFilter}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className={isActive ? 'sidebar active' : 'sidebar'}>
          <Sidebar
            filter={filter}
            setFilter={setFilter}
            categories={categories}
            topicType={topicType}
            setTopicType={setTopicType}
          />
        </div>
        <div className={isActive ? 'topic-left active' : 'topic-left'}></div>
      </div>
    </>
  );
};

export default TopicPage;
