import { Dispatch } from 'react';
import { HISTORY } from 'src/interfaces';

interface RENDERQUESTIONPROPS {
  history: HISTORY;
  setIsModalResult: Dispatch<boolean>;
  questionIndex: number;
}

const RenderQuestion = (props: RENDERQUESTIONPROPS) => {
  const { setIsModalResult, questionIndex, history } = props;

  return (
    <>
      <div
        className="topic-result-heading"
        onClick={() => setIsModalResult(true)}
      >
        <span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
          </svg>
        </span>
        <span>Quay lại</span>
      </div>
      <div className="question">
        <div className="question-title">
          <span>
            Câu {questionIndex} : {history.questions[questionIndex]?.name}
          </span>
          {history.questions[questionIndex]?.image && (
            <img src={history.questions[questionIndex]?.image} alt="" />
          )}
        </div>
        <div className="question-answer">
          {history.questions[questionIndex]?.answers.map(
            (item: any, index: number) => {
              return (
                <div key={item._id}>
                  <input
                    type="radio"
                    name="1"
                    id={`answer_${index}`}
                    checked={item.isCorrect}
                  />
                  <label
                    htmlFor={`answer_${index}`}
                    className={
                      history.answers[questionIndex] === index ? 'active' : ''
                    }
                  >
                    <span>{item.name}</span>
                    {item.image && <img src={item.image} alt="" />}
                  </label>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default RenderQuestion;
