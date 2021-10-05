import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { historyApi } from 'src/apis';

import ModalContent from 'src/components/AttemptResult/ModalContent';
import RenderContent from 'src/components/AttemptResult/RenderContent';

import RenderQuestion from 'src/components/AttemptResult/RenderQuestion';

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
      <Head>
        <meta lang="UTF-8" />
        <title>Trắc nghiệm Online – Luyện thi Online miễn phí</title>
        <meta
          name="Keywords"
          content="Trắc nghiệm, Đề Thi Học Kỳ, Đề Thi THPT Quốc Gia, Đề Kiểm Tra, English test, IT test, MBTI test, IQ/EQ test, thi bắng lái, công chức, đại cương, chuyên nghành, kết thúc học phần ĐHCĐ"
        />
        <meta
          name="Description"
          content="Tuyển tập các đề thi trắc nghiệm THPT QG 2020, ngân hàng câu trắc nghiệm các môn từ lớp 1 đến 12, English test, IT test, MBTI test, IQ/EQ test, thi bắng lái, công chức và kết thúc học phần ĐHCĐ"
        />
        <meta
          property="og:title"
          content="Trắc nghiệm Online – Luyện thi Online miễn phí"
        />
        <meta
          property="og:description"
          content="Tuyển tập các đề thi trắc nghiệm THPT QG 2020, ngân hàng câu trắc nghiệm các môn từ lớp 1 đến 12, English test, IT test, MBTI test, IQ/EQ test, thi bắng lái, công chức và kết thúc học phần ĐHCĐ"
        />
        <meta
          property="og:image"
          content="https://s.tracnghiem.net/assets/images/fb-trac-nghiem.jpg"
        />
      </Head>
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
