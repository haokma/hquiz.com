import Slider from 'react-slick';
import { TOPIC } from 'src/interfaces';
import { formatTime } from 'src/utils';
import { ClockSvg } from '../common/Svg';

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

interface ATTEMPTINFOPROPS {
  questionIndex: number;
  checkAnswer: (index: number) => boolean;
  selectQuestion: (index: number) => void;
  minutes: number;
  seconds: number;
  handleEndExam: () => void;
  questionComplete: number;
  topic: TOPIC;
}

const AttemptInfo = (props: ATTEMPTINFOPROPS) => {
  const {
    questionIndex,
    checkAnswer,
    selectQuestion,
    minutes,
    seconds,
    handleEndExam,
    questionComplete,
    topic,
  } = props;
  return (
    <div className="attempt-info">
      <div className="attempt-info-content">
        <div className="attempt-info-name">
          <span># Đề thi</span>
          <span>{topic?.name}</span>
        </div>
        <div className="attempt-time">
          <div>
            <ClockSvg />
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
              <span>{questionComplete}</span>
              <span>/</span>
              <span>{topic?.questionCount}</span>
            </div>
          </div>
          <div className="attempt-map-picture">
            {Array.from(Array(topic?.questionCount).keys()).map(
              (item, index) => {
                let className = '';
                if (index === questionIndex) {
                  className += ' active';
                }
                if (checkAnswer(index)) {
                  className += ' math';
                }
                return (
                  <div
                    className={className}
                    onClick={() => selectQuestion(index)}
                    key={index}
                  ></div>
                );
              }
            )}
          </div>
        </div>
        <div className="attempt-button">
          <button onClick={() => handleEndExam()}>Kết thúc bài thi</button>
        </div>
        <div className="attempt-question-mobile">
          <Slider {...settings}>
            {Array.from(Array(topic?.questionCount).keys()).map(
              (item, index) => {
                let className = '';
                if (index === questionIndex) className += 'active';
                return (
                  <div
                    className={className}
                    onClick={() => selectQuestion(index)}
                    key={index}
                  >
                    Câu {index + 1}
                  </div>
                );
              }
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default AttemptInfo;
