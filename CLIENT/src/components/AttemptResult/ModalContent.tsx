import { Dispatch } from 'react';
import AttemptButton from 'src/components/Attempt/AttemptButton';
import { ArrowLeft } from 'src/components/common/Svg';
import { HISTORY } from 'src/interfaces';

interface MODALCONTENTPROPS {
  isModalResult: boolean;
  setIsModalResult: Dispatch<boolean>;
  setIsActive: Dispatch<boolean>;
  setQuestionIndex: Dispatch<number>;
  history: HISTORY;
}

const ModalContent = (props: MODALCONTENTPROPS) => {
  const {
    isModalResult,
    setIsModalResult,
    setIsActive,
    setQuestionIndex,
    history,
  } = props;
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

export default ModalContent;
