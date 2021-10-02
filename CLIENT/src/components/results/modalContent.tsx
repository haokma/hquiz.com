import { Dispatch } from 'react';
import { History } from 'src/interfaces';
import { AttemptButton } from '../attempt/attemptButton';
import { ArrowLeft } from '../svg';

interface PROPS {
  isModalResult: boolean;
  setIsModalResult: Dispatch<boolean>;
  setIsActive: Dispatch<boolean>;
  setQuestionIndex: Dispatch<number>;
  history: History;
}

export const ModalContent = (props: PROPS) => {
  const {
    isModalResult,
    setIsModalResult,
    setIsActive,
    setQuestionIndex,
    history,
  } = props;
  console.log(isModalResult);
  return (
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
  );
};
