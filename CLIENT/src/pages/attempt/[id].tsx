import { useState } from 'react';
import LayoutAttempt from '../../components/common/LayoutAttempt';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
};

const Attempt: any = () => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [answers, setAnswers] = useState([1, 0, 1, 0, 1, 1]);

  const checkAnswer = (index: number): boolean => {
    if (!answers[index]) return false;
    return true;
  };
  return (
    <div className="attempt">
      <div className="container-fluid">
        <div className="attempt-heading">
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
          </span>
          <span>Trang chủ</span>
        </div>
        <div className="row-reverse ">
          <div className="col-xl-9 col-lg-8">
            <div className="attempt-question">
              <span className="attempt-title">
                Giả sử thư viện math đã được khai báo trước. Giá trị của 2 biến s1, s2 lần lượt là:{' '}
              </span>
              <div className="attempt-answer">
                {[1, 2, 3, 4].map((item) => {
                  return (
                    <>
                      <input type="checkbox" id={`answer_${item}`} />
                      <label htmlFor={`answer_${item}`}>{item}</label>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 ">
            <div className="attempt-info">
              <div className="attempt-info-name">
                <span># Đề thi</span>
                <span>Trường THPT Phan Châu Trinh lần 3</span>
              </div>
              <div className="attempt-time">
                <div>
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 6H11V7C11 7.55228 11.4477 8 12 8C12.5523 8 13 7.55228 13 7V6Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 2V4H7V7C7 9.76142 9.23858 12 12 12C9.23858 12 7 14.2386 7 17V20H6V22H18V20H17V17C17 14.2386 14.7614 12 12 12C14.7614 12 17 9.76142 17 7V4H18V2H6ZM9 4H15V7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7V4ZM9 17V20H15V17C15 15.3431 13.6569 14 12 14C10.3431 14 9 15.3431 9 17Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span>Thời gian làm bài</span>
                </div>
                <div className="attempt-cricle">
                  <div className="attempt-cricle-text">
                    <div>
                      <span>29</span>
                    </div>
                    <div>
                      <span>:</span>
                    </div>
                    <div>
                      <span>29</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="attempt-map">
                <div className="attempt-map-text">
                  <span># Sơ đồ thi</span>
                  <div>
                    <span>0</span>
                    <span>/</span>
                    <span>20</span>
                  </div>
                </div>
                <div className="attempt-map-picture">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                    let className = '';
                    if (item === questionIndex) {
                      className += ' active';
                    }
                    if (checkAnswer(index)) {
                      className += ' math';
                    }
                    return <div className={className} onClick={() => setQuestionIndex(item)}></div>;
                  })}
                </div>
              </div>
              <div className="attempt-button">
                <button>Kết thúc bài thi</button>
              </div>
              <div className="attempt-question-mobile">
                <Slider {...settings}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
                    let className = '';
                    if (item === questionIndex) className += 'active';
                    return (
                      <div className={className} onClick={() => setQuestionIndex(item)}>
                        Câu {item}
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Attempt.Layout = LayoutAttempt;

export default Attempt;
