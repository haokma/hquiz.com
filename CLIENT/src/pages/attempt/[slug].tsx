import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import rankingApi from '../../apis/rankingApi';
import topicApi from '../../apis/topicApi';
import AttemptInfo from '../../components/attempt/attemptInfo';
import AttemptQueston from '../../components/attempt/attemptQuestion';
import LayoutAttempt from '../../components/common/LayoutAttempt';
import LoadingApp from '../../components/common/Loading/LoadingAttempt';
import ArrowLeft from '../../components/svg/arrowLeft';
import ArrowRight from '../../components/svg/arrowRight';
import { QUESTION, Topic } from '../../interfaces';
import formatTime from '../../utils/formatTime';

const Attempt: any = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionComplete, setQuestionComplete] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [questionList, setQuestionList] = useState<QUESTION[]>([]);
  const [topic, setTopic] = useState<Topic>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      const fetchTopicSlug = async () => {
        setLoading(true);
        try {
          const res = await topicApi.getBySlug(slug);
          const { topic } = res.data;

          setTopic(topic);
          setMinutes(topic.time / 60);
          setSeconds(topic.time % 60);
          setQuestionList(topic.questions);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setQuestionList([]);
          router.push('/');
        }
      };
      fetchTopicSlug();
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      const oldSlug = sessionStorage.getItem('slug');
      sessionStorage.setItem('slug', JSON.stringify(slug));

      if (JSON.parse(oldSlug as string) !== slug) {
        console.log({
          oldSlug,
          slug,
        });
        sessionStorage.removeItem('answers');
        setAnswers([]);
      }
    }
  }, [slug]);

  useEffect(() => {
    if (!answers.length) {
      const oldAnsers = JSON.parse(sessionStorage.getItem('answers') as string) || [];
      setAnswers(oldAnsers);
    }
    return () => {
      sessionStorage.removeItem('answers');
      sessionStorage.removeItem('slug');
    };
  }, []);

  const checkAnswer = (index: number): boolean => {
    if (answers[index] === undefined || answers[index] === null) return false;
    return true;
  };

  const handleAnswer = (index: number): void => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = index;
    setAnswers(newAnswers);

    const result = newAnswers.filter((item) => item !== (null || undefined));
    setQuestionComplete(result.length);

    sessionStorage.setItem('answers', JSON.stringify(newAnswers));
  };

  const selectQuestion = (index: number): void => {
    setQuestionIndex(index);
  };

  const handleEndExam = async () => {
    const ranking = {
      topicId: topic?._id,
      username: 'Chí Hào',
      userId: '6151fea542d9d51d503b587a',
      score: 10,
      time: 1800,
    };
    try {
      await rankingApi.create(ranking);
      router.push(`/attempt/ket-qua/${topic?.slug}`);
    } catch (error) {}
  };

  if (loading) {
    return <LoadingApp />;
  }
  return (
    <>
      <Head>
        <title>Đề thi trắc nghiệm THPT Quốc Gia mới nhất</title>
      </Head>
      <div className="attempt">
        <div className="container-fluid">
          <div className="attempt-heading">
            <Link href="/">
              <a>
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
                    <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
                  </svg>
                  <span>Trang chủ</span>
                </span>
              </a>
            </Link>
            <div className="attempt-heading-time">
              <span>{formatTime(minutes)}</span>
              <span>:</span>
              <span>{formatTime(seconds)}</span>
            </div>
          </div>
          <div className="row-reverse ">
            <div className="col-xl-9 col-lg-8">
              <AttemptQueston
                questionIndex={questionIndex}
                questionList={questionList}
                handleAnswer={handleAnswer}
                answers={answers}
              />
            </div>
            <div className="col-xl-3 col-lg-4 ">
              <AttemptInfo
                topic={topic as Topic}
                minutes={minutes}
                seconds={seconds}
                checkAnswer={checkAnswer}
                questionIndex={questionIndex}
                selectQuestion={selectQuestion}
                handleEndExam={handleEndExam}
                questionComplete={questionComplete}
              />
            </div>
          </div>
          <div className="attempt-controls">
            <div
              className="attempt-controls-left"
              onClick={() => setQuestionIndex(questionIndex - 1)}
            >
              {questionIndex > 0 && (
                <>
                  <ArrowLeft />
                  <span>Câu {questionIndex}</span>
                </>
              )}
            </div>
            <div className="attempt-controls-mid">
              <span>Kết thúc bài thi</span>
            </div>
            <div
              className="attempt-controls-right"
              onClick={() => setQuestionIndex(questionIndex + 1)}
            >
              {questionIndex < Number(topic?.questionCount) - 1 && (
                <>
                  <span>Câu {questionIndex + 2}</span>
                  <ArrowRight />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Attempt.Layout = LayoutAttempt;

export default Attempt;
