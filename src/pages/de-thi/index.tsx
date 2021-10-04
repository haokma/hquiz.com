import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { categoryApi, topicApi } from 'src/apis';
import { TopicList } from 'src/components/Topic';
import Sidebar from 'src/components/Topic/Sidebar';
import { LIMIT } from 'src/constants';
import { CATEGORY, FILTERCATEGORY, TOPIC, TOPICTYPE } from 'src/interfaces';

const TopicPage: any = () => {
  const [isActive, setIsActive] = useState(false);
  const [topicList, setTopicList] = useState<TOPIC[]>([]);
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
  //  Check mobile desktop
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
  // Fetch Topic List
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
        router.push('/');
        setIsLoading(false);
        toast.error('Có lỗi xảy ra!');
      }
    };
    fetchTopic();
  }, [filter.page, filter.categoryId]);
  // Fetch Category
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await categoryApi.getList();

        setCategories(res.data.categories);
      } catch (error) {
        toast.error('Có lỗi xảy ra!');
        router.push('/');
      }
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
        <TopicList
          setIsActive={setIsActive}
          isActive={isActive}
          isLoading={isLoading}
          topicList={topicList}
          totalPage={totalPage}
          setFilter={setFilter}
          filter={filter}
        />
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
