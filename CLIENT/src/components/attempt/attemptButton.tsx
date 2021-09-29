import { Dispatch } from 'react';
import { QUESTION } from '../../interfaces';

interface PROPS {
  setIsModalResult: Dispatch<boolean>;
  setIsActive: Dispatch<boolean>;
  setQuestionIndex: Dispatch<number>;
  questionList: QUESTION[];
}

const AttemptButton = (props: PROPS) => {
  const { setIsModalResult, setIsActive, setQuestionIndex, questionList } = props;

  return (
    <ul className="modal-result-list">
      {Array.from(Array(questionList.length).keys()).map((item, index) => {
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
};

export default AttemptButton;