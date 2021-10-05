import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { categoryApi, historyApi } from 'src/apis';
import ExamHistoryList from 'src/components/ExamHistory/ExamHistoryList';
import Pagination from 'src/components/Pagination/Pagination';
import Sidebar from 'src/components/Topic/Sidebar';
import { LIMIT } from 'src/constants';
import { CATEGORY, FILTERCATEGORY, TOPICTYPE } from 'src/interfaces';
import { getLocalStorage } from 'src/utils';

const ExamHistory: NextPage = () => {
  const router = useRouter();

  const [filter, setFilter] = useState<FILTERCATEGORY>({
    limit: LIMIT,
    page: 1,
    categoryId: '',
  });
  const [topicType, setTopicType] = useState<TOPICTYPE>({
    _id: '',
    name: '',
  });
  const [categories, setCategories] = useState<CATEGORY[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [examHistoryList, setExamHistoryList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchExamHistoryByUser = async () => {
      const user = getLocalStorage('user');
      setIsLoading(true);
      try {
        const res = await historyApi.getListByUser({
          ...filter,
          userId: user._id,
          topicId: topicType._id,
        });
        const { pagination, historyList } = res.data;
        const { _total, _limit, _page } = pagination;

        setFilter((prev) => ({
          ...prev,
          page: _page,
          limit: _limit,
        }));
        setTotalPage(Math.ceil(_total / _limit));
        setExamHistoryList(historyList);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error('Có lỗi xảy ra!');
      }
    };
    fetchExamHistoryByUser();
  }, [topicType._id]);

  return (
    <div className="exam-history">
      <div className="exam-history-content">
        <div
          className={isActive ? 'modal active' : 'modal'}
          onClick={() => setIsActive(false)}
        ></div>
        <div className="exam-history-heading">
          <button onClick={() => setIsActive(!isActive)}>Bộ lọc</button>
        </div>
        <ExamHistoryList
          examHistoryList={examHistoryList}
          isLoading={isLoading}
        />
        <div className="pagination">
          <Pagination
            TOTAL_PAGE={totalPage}
            SHOW_PAGE={5}
            PAGE={filter.page}
            filter={filter}
            setFilter={setFilter}
          />
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
  );
};
export default ExamHistory;
