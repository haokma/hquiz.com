import LayoutAttempt from '../../components/common/LayoutAttempt';
import Link from 'next/link';
import { useState } from 'react';
import data from '../../data/question.json';

const TopicResult: any = () => {
  const [isModalResult, setIsModalResult] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  function renderContent() {
    return (
      <>
        <div className="topic-result-heading">
          <Link href="/">
            <a>
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
              <span>Trang chủ</span>
            </a>
          </Link>
        </div>
        <div className="topic-result-content">
          <div className="result">
            <div className="result-time"></div>
            <p className="result-title">Số câu hoàn thành</p>
            <div className="result-total">
              <span>00</span>
              <span>/</span>
              <span>20</span>
            </div>
            <h5 className="result-slogan">Chúc mừng! Bạn đã hoàn thành bài thi!</h5>
            <div className="result-table">
              <div className="result-table-item">
                <p>
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>00 câu</span>
                </p>
                <div style={{ backgroundColor: '#f05123' }}></div>
                <p className="process">100%</p>
              </div>
              <div className="result-table-item">
                <p>
                  <span>
                    <svg
                      style={{ color: 'red' }}
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </span>
                  <span>00 câu</span>
                </p>
                <div></div>
                <p className="process">0%</p>
              </div>
              <div className="result-table-item">
                <p>
                  <span>
                    <svg
                      style={{ color: 'yellow' }}
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
                      ></path>
                      <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
                      ></path>
                      <path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"></path>
                    </svg>
                  </span>
                  <span>00 câu</span>
                </p>
                <div></div>
                <p className="process">0%</p>
              </div>
            </div>
            <div className="result-toggle" onClick={() => setIsModalResult(true)}>
              <span>Xem kết quả chi tiết</span>
              <span>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
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
              Câu {questionIndex} : {data.questions[questionIndex].title}
            </span>
            {data.questions[questionIndex].image && (
              <img src={data.questions[questionIndex].image} alt="" />
            )}
          </div>
          <div className="question-answer">
            {data.questions[questionIndex].answers.map((item, index) => {
              return (
                <>
                  <input type="radio" name="1" id={`answer_${index}`} checked={index === 3} />
                  <label htmlFor={`answer_${index}`}>
                    <span>{item.value}</span>
                    {item.image && <img src={item.image} alt="" />}
                  </label>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  function renderButton() {
    return (
      <ul className="modal-result-list">
        {Array.from(Array(data.questions.length).keys()).map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setIsModalResult(false);
                setIsActive(true);
                setQuestionIndex(item);
              }}
            >
              <span>Câu {item + 1}</span>
              <span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
                  ></path>
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
                  ></path>
                  <path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"></path>
                </svg>
              </span>
            </li>
          );
        })}
      </ul>
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
          <span>Tổng kết</span>
        </div>
        <div className="modal-result-content">{renderButton()}</div>
      </div>
    </div>
  );
};

TopicResult.Layout = LayoutAttempt;

export default TopicResult;
