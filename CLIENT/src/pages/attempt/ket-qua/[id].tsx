import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AttemptButton from '../../../components/attempt/attemptButton';
import LayoutAttempt from '../../../components/common/LayoutAttempt';
import ArrowLeft from '../../../components/svg/arrowLeft';
import ArrowRight from '../../../components/svg/arrowRight';
import Error from '../../../components/svg/error';
import Success from '../../../components/svg/success';
import Waring from '../../../components/svg/waring';
import data from '../../../data/question.json';
import { QUESTION } from '../../../interfaces';

const TopicResult: any = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isModalResult, setIsModalResult] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questionList, setQuestionList] = useState<QUESTION[]>([]);

  useEffect(() => {
    if (id) {
      const index = data.questions.findIndex((item) => item._id === Number(id));

      setQuestionList(data.questions[index].data);
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
              <span>30</span>
              <span>:</span>
              <span>00</span>
            </div>
            <p className="result-title">Số câu hoàn thành</p>
            <div className="result-total">
              <span>{questionList.length}</span>
              <span>/</span>
              <span>{questionList.length}</span>
            </div>
            <h5 className="result-slogan">Chúc mừng! Bạn đã hoàn thành bài thi!</h5>
            <div className="result-table">
              <div className="result-table-item">
                <p>
                  <Success />
                  <span>00 câu</span>
                </p>
                <div style={{ backgroundColor: '#f05123' }}></div>
                <p className="process">100%</p>
              </div>
              <div className="result-table-item">
                <p>
                  <Error />
                  <span>00 câu</span>
                </p>
                <div></div>
                <p className="process">0%</p>
              </div>
              <div className="result-table-item">
                <p>
                  <Waring />
                  <span>00 câu</span>
                </p>
                <div></div>
                <p className="process">0%</p>
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
    console.log(questionList[questionIndex]?.answers);
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
              Câu {questionIndex} : {questionList[questionIndex]?.title}
            </span>
            {questionList[questionIndex]?.image && (
              <img src={questionList[questionIndex]?.image} alt="" />
            )}
          </div>
          <div className="question-answer">
            {questionList[questionIndex]?.answers.map((item, index) => {
              console.log(item.isCorrect);
              return (
                <div key={item._id}>
                  <input type="radio" name="1" id={`answer_${index}`} checked={item.isCorrect} />
                  <label htmlFor={`answer_${index}`}>
                    <span>{item.value}</span>
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
            questionList={questionList}
            setIsActive={setIsActive}
            setQuestionIndex={setQuestionIndex}
            setIsModalResult={setIsModalResult}
          />
        </div>
      </div>
    </div>
  );
};

TopicResult.Layout = LayoutAttempt;

export default TopicResult;
