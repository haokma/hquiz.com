import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { historyApi, rankingApi, topicApi } from 'src/apis';
import AttemptControls from 'src/components/Attempt/AttemptControls';
import AttemptInfo from 'src/components/Attempt/AttemptInfo';
import AttemptQuestion from 'src/components/Attempt/AttemptQuestion';
import LayoutAttempt from 'src/components/common//Layout/LayoutAttempt';
import LoadingApp from 'src/components/common/Loading/LoadingAttempt';
import { ArrowLeft } from 'src/components/common/Svg';
import { QUESTION, TOPIC, USER_RESPONSE } from 'src/interfaces';
import {
  answersSuccess,
  calceScore,
  formatTime,
  getLocalStorage,
} from 'src/utils';

const Attempt: any = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionComplete, setQuestionComplete] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [questionList, setQuestionList] = useState<QUESTION[]>([]);
  const [topic, setTopic] = useState<TOPIC>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (seconds === 0 && minutes === 0) {
      handleEndExam();
      return;
    }

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

  useEffect(() => {
    if (slug) {
      const fetchTopicSlug = async () => {
        setLoading(true);
        try {
          const res = await topicApi.getBySlug(slug);
          const { topic } = res.data;
          const oldAnswers = JSON.parse(
            sessionStorage.getItem('answers') as string
          );

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
          toast.error('Có lỗi xảy ra!');
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
    if (
      answers[index] === undefined ||
      answers[index] === null ||
      answers[index] === -1
    )
      return false;
    return true;
  };
  const handleAnswer = (index: number): void => {
    let newAnswers = [...answers];
    newAnswers[questionIndex] = index;
    setAnswers(newAnswers);

    const result = newAnswers.filter(
      (item) => item !== (null || undefined || -1)
    );
    setQuestionComplete(result.length);

    sessionStorage.setItem('answers', JSON.stringify(newAnswers));
  };
  const selectQuestion = (index: number): void => {
    setQuestionIndex(index);
  };

  const createHistory = (user: USER_RESPONSE, timespan: number) => {
    const history = {
      topicId: topic?._id,
      answers,
      userId: user._id,
      timespan,
      isSubmit: true,
      username: user.username,
      topicName: topic?.name,
    };
    return history;
  };

  const submitExam = async () => {
    const user = getLocalStorage('user');
    const totalSuccess = answersSuccess(topic?.questions, answers);
    const newTopic = topic as TOPIC;
    const timespan = newTopic?.time - (minutes * 60 + seconds);

    const ranking = {
      topicId: topic?._id,
      username: user.username,
      userId: user._id,
      score: calceScore(totalSuccess, topic?.questions),
      time: timespan,
    };
    const history = createHistory(user, timespan);
    setLoading(true);
    try {
      Promise.all([
        topicApi.update(topic?._id as string, topic?.views as number),
        historyApi.create(history),
        rankingApi.create(ranking),
      ])
        .then(() => {
          setLoading(false);
          router.push(`/attempt/ket-qua/${topic?._id}`);
        })
        .catch(() => {
          toast.error('Có lỗi xảy ra');
          router.push('/');
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const handleEndExam = () => {
    if (minutes === 0 && seconds === 0) {
      submitExam();
      return;
    }
    if (window.confirm('Bạn có chắc chắn muốn kết thúc bài thi không')) {
      submitExam();
    }
  };

  if (loading) {
    return <LoadingApp />;
  }
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
      <div className="attempt">
        <div className="container-fluid">
          <div className="attempt-heading">
            <Link href="/">
              <a>
                <ArrowLeft />
                <span>Trang chủ</span>
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
              <AttemptQuestion
                questionIndex={questionIndex}
                questionList={questionList}
                handleAnswer={handleAnswer}
                answers={answers}
              />
            </div>
            <div className="col-xl-3 col-lg-4 ">
              <AttemptInfo
                topic={topic as TOPIC}
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
          <AttemptControls
            topic={topic}
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
            handleEndExam={handleEndExam}
          />
        </div>
      </div>
    </>
  );
};

Attempt.Layout = LayoutAttempt;

export default Attempt;
