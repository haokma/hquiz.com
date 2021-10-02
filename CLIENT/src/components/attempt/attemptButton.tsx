import { Dispatch } from 'react';
import { Error, Success, Waring } from '../svg';

interface PROPS {
  setIsModalResult: Dispatch<boolean>;
  setIsActive: Dispatch<boolean>;
  setQuestionIndex: Dispatch<number>;
  history: any;
}

const AttemptButton = (props: PROPS) => {
  const { setIsModalResult, setIsActive, setQuestionIndex, history } = props;

  const checkStatus = (index: number) => {
    if (!history.answersResult) return;
    if (history.answersResult[index] === -1) return <Waring />;
    else if (history.answersResult[index]) {
      return <Success />;
    } else {
      return <Error />;
    }
  };

  return (
    <ul className="modal-result-list">
      {Array.from(Array(history.questions?.length).keys()).map((item, index) => {
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
