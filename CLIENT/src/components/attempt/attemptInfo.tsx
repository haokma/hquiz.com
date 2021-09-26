import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { QUESTION } from '../../interfaces';
import formatTime from '../../utils/formatTime';

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

interface PROPS {
  questionIndex: number;
  questionList: QUESTION[];
  checkAnswer: (index: number) => boolean;
  selectQuestion: (index: number) => void;
  minutes: number;
  seconds: number;
  id: number;
}

const AttemptInfo = (props: PROPS) => {
  const router = useRouter();

  const { questionIndex, questionList, checkAnswer, selectQuestion, minutes, seconds, id } = props;
  return (
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
              strokeWidth="0"
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
                fillRule="evenodd"
                clipRule="evenodd"
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
              <span>{formatTime(minutes)}</span>
            </div>
            <div>
              <span>:</span>
            </div>
            <div>
              <span>{formatTime(seconds)}</span>
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
            <span>{questionList.length}</span>
          </div>
        </div>
        <div className="attempt-map-picture">
          {Array.from(Array(questionList.length).keys()).map((item, index) => {
            let className = '';
            if (index + 1 === questionIndex) {
              className += ' active';
            }
            if (checkAnswer(index)) {
              className += ' math';
            }
            return (
              <div
                className={className}
                onClick={() => selectQuestion(index + 1)}
                key={index}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="attempt-button">
        <button onClick={() => router.push(`/attempt/ket-qua/${id}`)}>Kết thúc bài thi</button>
      </div>
      <div className="attempt-question-mobile">
        <Slider {...settings}>
          {Array.from(Array(questionList.length).keys()).map((item, index) => {
            let className = '';
            if (item + 1 === questionIndex) className += 'active';
            return (
              <div className={className} onClick={() => selectQuestion(item + 1)} key={index}>
                Câu {item + 1}
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default AttemptInfo;
