import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { historyApi } from 'src/apis';
import {
  ModalContent,
  RenderContent,
  RenderQuestion,
} from 'src/components/AttemptResult';
import LayoutAttempt from 'src/components/common/Layout/LayoutAttempt';
import LoadingApp from 'src/components/common/Loading/LoadingAttempt';
import { getLocalStorage } from 'src/utils';

const TopicResult: any = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isModalResult, setIsModalResult] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(false);

  const fetchHistory = async (id: string) => {
    setLoading(true);
    const user = getLocalStorage('user');
    try {
      const res = await historyApi.get(user._id, id);
      const { history } = res.data;
      if (!history) {
        router.push('/');
        return;
      }
      setHistory(history);
      setLoading(false);
    } catch (error) {
      router.push('/');
      setLoading(false);
      toast.error('Có lỗi xảy ra!');
    }
  };

  useEffect(() => {
    if (id) {
      fetchHistory(id as string);
    }
  }, [id]);

  if (loading || !history) {
    return <LoadingApp />;
  }
  console.log('Rên');

  return (
    <>
      <div className="topic-result">
        <div className="topic-result-left">
          {isActive ? (
            <RenderQuestion
              history={history}
              setIsModalResult={setIsModalResult}
              questionIndex={questionIndex}
            />
          ) : (
            <RenderContent
              history={history}
              setIsModalResult={setIsModalResult}
              id={id as string}
            />
          )}
        </div>
        <div className="topic-result-right"></div>
        <ModalContent
          history={history}
          isModalResult={isModalResult}
          setIsModalResult={setIsModalResult}
          setIsActive={setIsActive}
          setQuestionIndex={setQuestionIndex}
        />
      </div>
    </>
  );
};

TopicResult.Layout = LayoutAttempt;

export default TopicResult;
