import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import historyApi from 'src/apis/historyApi';
import AttemptButton from 'src/components/attempt/attemptButton';
import LayoutAttempt from 'src/components/common/LayoutAttempt';
import LoadingApp from 'src/components/common/Loading/LoadingAttempt';
import { ArrowLeft, ArrowRight, Error, Success, Waring } from 'src/components/svg';
import { formatTime, getLocalStorage } from 'src/utils';

const TopicResult: any = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isModalResult, setIsModalResult] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [history, setHistory] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchHistory = async (id: string) => {
    setLoading(true);
    const user = getLocalStorage('user');
    try {
      const res = await historyApi.get(user._id, id);
      const { history } = res.data;

      setLoading(false);
      setHistory(history);
    } catch (error) {
      router.push('/');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchHistory(id as string);
    }
  }, [id]);

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
              <span>{formatTime(Math.floor(history.timespan / 60))}</span>
              <span>:</span>
              <span>{formatTime(history.timespan % 60)}</span>
            </div>
            <p className="result-title">Số câu hoàn thành</p>
            <div className="result-total">
              <span>{history.totalComplete}</span>
              <span>/</span>
              <span>{history.questions?.length}</span>
            </div>
            <h5 className="result-slogan">Chúc mừng! Bạn đã hoàn thành bài thi!</h5>
            <div className="result-table">
              <div className="result-table-item">
                <p>
                  <Success />
                  <span>{history.totalSuccess} câu</span>
                </p>
                <div className="progress-line">
                  <div
                    style={{
                      width: `${((history?.totalSuccess / history.questions?.length) * 100).toFixed(
                        2
                      )}%`,
                      backgroundColor: 'rgb(0, 168, 107)',
                    }}
                  ></div>
                </div>
                <p className="process">
                  {((history.totalSuccess / history.questions?.length) * 100).toFixed(2)}%
                </p>
              </div>
              <div className="result-table-item">
                <p>
                  <Error />
                  <span>{history.totalError} câu</span>
                </p>
                <div className="progress-line">
                  <div
                    style={{
                      width: `${(history?.totalError / history.questions?.length) * 100}%`,
                      backgroundColor: 'red',
                    }}
                  ></div>
                </div>
                <p className="process">
                  {((history?.totalError / history.questions?.length) * 100).toFixed(2)}%
                </p>
              </div>
              <div className="result-table-item">
                <p>
                  <Waring />
                  <span>{history.totalEmpty} câu</span>
                </p>
                <div className="progress-line">
                  <div
                    style={{
                      width: `${(history.totalEmpty / history.questions?.length) * 100}%`,
                      backgroundColor: 'yellow',
                    }}
                  ></div>
                </div>
                <p className="process">
                  {((history.totalEmpty / history.questions?.length) * 100).toFixed(2)}%
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
              Câu {questionIndex} : {history.questions[questionIndex]?.name}
            </span>
            {history.questions[questionIndex]?.image && (
              <img src={history.questions[questionIndex]?.image} alt="" />
            )}
          </div>
          <div className="question-answer">
            {history.questions[questionIndex]?.answers.map((item: any, index: number) => {
              console.log(history.answers[questionIndex]);
              return (
                <div key={item._id}>
                  <input type="radio" name="1" id={`answer_${index}`} checked={item.isCorrect} />
                  <label
                    htmlFor={`answer_${index}`}
                    className={history.answers[questionIndex] === index ? 'active' : ''}
                  >
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

  if (loading || !history) {
    return <LoadingApp />;
  }

  return (
    <>
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
              history={history}
              setIsActive={setIsActive}
              setQuestionIndex={setQuestionIndex}
              setIsModalResult={setIsModalResult}
            />
          </div>
        </div>
      </div>
    </>
  );
};

TopicResult.Layout = LayoutAttempt;

export default TopicResult;
