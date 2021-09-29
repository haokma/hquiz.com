import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { QUESTION } from '../../interfaces';
import formatTime from '../../utils/formatTime';
import ClockSvg from '../svg/clocksvg';

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
  id: any;
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
