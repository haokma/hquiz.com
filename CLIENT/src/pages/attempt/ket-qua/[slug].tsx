import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import historyApi from 'src/apis/historyApi';
import topicApi from 'src/apis/topicApi';
import AttemptButton from 'src/components/attempt/attemptButton';
import LayoutAttempt from 'src/components/common/LayoutAttempt';
import LoadingApp from 'src/components/common/Loading/LoadingAttempt';
import { ArrowLeft, ArrowRight, Error, Success, Waring } from 'src/components/svg';
import { QUESTION, Topic } from 'src/interfaces';
import { calcProgress, checkAnswersList, formatTime } from 'src/utils';

const TopicResult: any = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [isModalResult, setIsModalResult] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questionList, setQuestionList] = useState<QUESTION[]>([]);
  const [topic, setTopic] = useState<Topic>();
  const [history, setHistory] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<number[]>();

  const fetchHistory = async () => {
    try {
      const res = await historyApi.get('6151fea542d9d51d503b587a', '6153b8941178d114ddf7668a');
      const { history } = res.data;

      setLoading(true);
      setHistory(history);
      // setAnswers(checkAnswersList(topic?.questions, history.answers));
    } catch (error) {
      console.log(error);
      // router.push('/');
      setLoading(false);
    }
  };
  useEffect(() => {
    if (slug) {
      const fetchTopicSlug = async () => {
        setLoading(true);
        try {
          const res = await topicApi.getBySlug(slug);
          const { topic } = res.data;

          setTopic(topic);
          setQuestionList(topic.questions);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchTopicSlug();
    }
  }, [slug]);
  useEffect(() => {
    fetchHistory();
  }, [slug]);

  function renderContent() {
    return (
      <>
        <div className="topic-result-heading">
          <Link href="/">
            <a>
              <ArrowLeft />
              <span>Trang chủ</span>
            </a>
          </Link>
        </div>
        <div className="topic-result-content">
          <div className="result">
            <div className="result-time">
              <span>{formatTime(Math.floor(history?.timespan / 60))}</span>
              <span>:</span>
              <span>{formatTime(history?.timespan % 60)}</span>
            </div>
            <p className="result-title">Số câu hoàn thành</p>
            <div className="result-total">
              <span>{history?.totalComplete}</span>
              <span>/</span>
              <span>{topic?.questionCount}</span>
            </div>
            <h5 className="result-slogan">Chúc mừng! Bạn đã hoàn thành bài thi!</h5>
            <div className="result-table">
              <div className="result-table-item">
                <p>
                  <Success />
                  <span>{history?.totalSuccess} câu</span>
                </p>
                <div className="progress-line">
                  <div
                    style={{
                      width: `${((history?.totalSuccess / topic?.questions.length) * 100).toFixed(
                        2
                      )}%`,
                      backgroundColor: 'rgb(0, 168, 107)',
                    }}
                  ></div>
                </div>
                <p className="process">
                  {((history?.totalSuccess / topic?.questions.length) * 100).toFixed(2)}%
                </p>
              </div>
              <div className="result-table-item">
                <p>
                  <Error />
                  <span>{history?.totalError} câu</span>
                </p>
                <div className="progress-line">
                  <div
                    style={{
                      width: `${(history?.totalError / topic?.questions.length) * 100}%`,
                      backgroundColor: 'red',
                    }}
                  ></div>
                </div>
                <p className="process">
                  {((history?.totalError / topic?.questions.length) * 100).toFixed(2)}%
                </p>
              </div>
              <div className="result-table-item">
                <p>
                  <Waring />
                  <span>{history?.totalEmpty} câu</span>
                </p>
                <div className="progress-line">
                  <div
                    style={{
                      width: `${(history?.totalEmpty / topic?.questions.length) * 100}%`,
                      backgroundColor: 'yellow',
                    }}
                  ></div>
                </div>
                <p className="process">
                  {((history?.totalEmpty / topic?.questions.length) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="result-toggle" onClick={() => setIsModalResult(true)}>
              <span>Xem kết quả chi tiết</span>
              <ArrowRight />
            </div>
            <div className="result-button">
              <Link href="/de-thi/1">
                <a>Thi lai</a>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderQuestion() {
    return (
      <>
        <div className="topic-result-heading" onClick={() => setIsModalResult(true)}>
          <span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
            </svg>
          </span>
          <span>Quay lại</span>
        </div>
        <div className="question">
          <div className="question-title">
            <span>
              Câu {questionIndex} : {questionList[questionIndex]?.name}
            </span>
            {questionList[questionIndex]?.image && (
              <img src={questionList[questionIndex]?.image} alt="" />
            )}
          </div>
          <div className="question-answer">
            {questionList[questionIndex]?.answers.map((item, index) => {
              return (
                <div key={item._id}>
                  <input type="radio" name="1" id={`answer_${index}`} checked={item.isCorrect} />
                  <label htmlFor={`answer_${index}`}>
                    <span>{item.name}</span>
                    {item.image && <img src={item.image} alt="" />}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  if (loading || !router.query.slug) {
    return <LoadingApp />;
  }
  return (
    <div className="topic-result">
      <div className="topic-result-left">{isActive ? renderQuestion() : renderContent()}</div>
      <div className="topic-result-right"></div>
      <div className={isModalResult ? 'modal-result active' : 'modal-result'}>
        <div
          className="modal-result-heading"
          onClick={() => {
            setIsModalResult(false);
            setIsActive(false);
          }}
        >
          <ArrowLeft />
          <span>Tổng kết</span>
        </div>
        <div className="modal-result-content">
          <AttemptButton
            answers={answers}
            history={history}
            questionList={questionList}
            setIsActive={setIsActive}
            setQuestionIndex={setQuestionIndex}
            setIsModalResult={setIsModalResult}
            questionCount={topic?.questionCount}
          />
        </div>
      </div>
    </div>
  );
};

TopicResult.Layout = LayoutAttempt;

export default TopicResult;
