import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import historyApi from 'src/apis/historyApi';
import rankingApi from 'src/apis/rankingApi';
import topicApi from 'src/apis/topicApi';
import AttemptInfo from 'src/components/attempt/attemptInfo';
import AttemptQueston from 'src/components/attempt/attemptQuestion';
import LayoutAttempt from 'src/components/common/LayoutAttempt';
import LoadingApp from 'src/components/common/Loading/LoadingAttempt';
import { ArrowLeft, ArrowRight } from 'src/components/svg';
import { QUESTION, Topic } from 'src/interfaces';
import { answersEmpty, answersError, answersSuccess, calceScore, formatTime } from 'src/utils';

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
          const oldAnswers = JSON.parse(sessionStorage.getItem('answers') as string);

          const answersList = [];
          for (let i = 0; i < 60; i++) answersList[i] = -1;
          if (!answers.length && !oldAnswers) {
            setAnswers(answersList);
          } else if (!answers.length && oldAnswers) {
            setAnswers(oldAnswers);
          }

          setTopic(topic);
          setMinutes(topic.time / 60);
          setSeconds(topic.time % 60);
          setQuestionList(topic.questions);
          setLoading(false);
        } catch (error) {
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
        sessionStorage.removeItem('answers');
        setAnswers([]);
      }
    }
  }, [slug]);
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('answers');
      sessionStorage.removeItem('slug');
    };
  }, []);

  const checkAnswer = (index: number): boolean => {
    if (answers[index] === undefined || answers[index] === null || answers[index] === -1)
      return false;
    return true;
  };
  const handleAnswer = (index: number): void => {
    let newAnswers = [...answers];
    newAnswers[questionIndex] = index;
    setAnswers(newAnswers);

    const result = newAnswers.filter((item) => item !== (null || undefined || -1));
    setQuestionComplete(result.length);

    sessionStorage.setItem('answers', JSON.stringify(newAnswers));
  };
  const selectQuestion = (index: number): void => {
    setQuestionIndex(index);
  };

  const createHistory = () => {
    const totalSuccess = answersSuccess(topic?.questions, answers);
    const totalError = answersError(topic?.questions, answers);
    const totalEmpty = answersEmpty(totalSuccess, totalError, topic?.questions);

    const history = {
      topicId: topic?._id,
      answers,
      userId: '6151fea542d9d51d503b587a',
      timespan: 1200,
      isSubmit: true,
      totalComplete: questionComplete,
      totalSuccess,
      totalError,
      totalEmpty,
      score: calceScore(totalSuccess, topic?.questions),
    };
    return history;
  };

  const handleEndExam = async () => {
    const ranking = {
      topicId: topic?._id,
      username: 'Chí Hào',
      userId: '6151fea542d9d51d503b587a',
      score: 10,
      time: 1800,
    };
    const history = createHistory();
    try {
      await historyApi.create(history);
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
