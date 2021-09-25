import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AttemptInfo from '../../components/attempt/attemptInfo';
import AttemptQueston from '../../components/attempt/attemptQuestion';
import LayoutAttempt from '../../components/common/LayoutAttempt';
import data from '../../data/question.json';
import { QUESTION } from '../../interfaces';
import formatTime from '../../utils/formatTime';

const Attempt: any = () => {
  const router = useRouter();
  const { id } = router.query;

  const [questionIndex, setQuestionIndex] = useState(1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [questionList, setQuestionList] = useState<QUESTION[]>([]);

  useEffect(() => {
    if (id) {
      const index = data.questions.findIndex((item) => item._id === Number(id));

      setQuestionList(data.questions[index].data);
      setAnswers(Array.from(Array(data.questions[index].data.length)).fill(0));
    }
  }, [id]);
  useEffect(() => {
    if (seconds === 0 && minutes === 0) return;

    const timer = setTimeout(() => {
      setSeconds(seconds - 1);

      if (seconds === 0 && minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [minutes, seconds]);

  const checkAnswer = (index: number): boolean => {
    if (!answers[index]) return false;
    return true;
  };

  const handleAnswer = (index: number): void => {
    const newAnswers = [...answers];
    newAnswers[questionIndex - 1] = index;
    setAnswers(newAnswers);
  };

  const selectQuestion = (index: number): void => {
    setQuestionIndex(index);
  };

  if (!questionList) {
    return <div>Loading</div>;
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
              />
            </div>
            <div className="col-xl-3 col-lg-4 ">
              <AttemptInfo
                minutes={minutes}
                seconds={seconds}
                checkAnswer={checkAnswer}
                questionIndex={questionIndex}
                questionList={questionList}
                selectQuestion={selectQuestion}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Attempt.Layout = LayoutAttempt;

export default Attempt;
