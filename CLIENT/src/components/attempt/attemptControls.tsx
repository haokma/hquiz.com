import { Dispatch } from 'react';
import { TOPIC } from 'src/interfaces';
import { ArrowLeft, ArrowRight } from '../common/Svg';

export interface ATTEMPTCONTROLSPROPS {
  setQuestionIndex: Dispatch<number>;
  questionIndex: number;
  handleEndExam: () => void;
  topic: TOPIC | undefined;
}

export const AttemptControls = (props: ATTEMPTCONTROLSPROPS) => {
  const { setQuestionIndex, questionIndex, handleEndExam, topic } =
    props;
  return (
    <div className="attempt-controls">
      <div
        className="attempt-controls-left"
        onClick={() => setQuestionIndex(questionIndex - 1)}
      >
        {questionIndex > 0 && (
          <>
            <ArrowLeft />
            <span>Câu {questionIndex}</span>
          </>
        )}
      </div>
      <div
        className="attempt-controls-mid"
        onClick={() => {
          handleEndExam();
        }}
      >
        <span>Kết thúc bài thi</span>
      </div>
      <div
        className="attempt-controls-right"
        onClick={() => setQuestionIndex(questionIndex + 1)}
      >
        {questionIndex < Number(topic?.questionCount) - 1 && (
          <>
            <span>Câu {questionIndex + 2}</span>
            <ArrowRight />
          </>
        )}
      </div>
    </div>
  );
};
