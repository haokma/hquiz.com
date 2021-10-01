import { Dispatch } from 'react';
import { QUESTION } from 'src/interfaces';
import { Success, Waring, Error } from '../svg';

interface PROPS {
  setIsModalResult: Dispatch<boolean>;
  setIsActive: Dispatch<boolean>;
  setQuestionIndex: Dispatch<number>;
  questionList: QUESTION[];
  questionCount: any;
  history: any;
  answers: any;
}

const AttemptButton = (props: PROPS) => {
  const { setIsModalResult, setIsActive, setQuestionIndex, questionCount, answers } = props;

  const checkStatus = (index: number) => {
    if (!answers) return;
    if (answers[index] === -1) return <Waring />;
    else if (answers[index]) {
      return <Success />;
    } else {
      return <Error />;
    }
  };

  return (
    <ul className="modal-result-list">
      {Array.from(Array(questionCount).keys()).map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              setIsModalResult(false);
              setIsActive(true);
              setQuestionIndex(index);
            }}
          >
            <span>Câu {index + 1}</span>
            {checkStatus(index)}
          </li>
        );
      })}
    </ul>
  );
};

export default AttemptButton;
