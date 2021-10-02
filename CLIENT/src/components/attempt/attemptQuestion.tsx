import { QUESTION } from 'src/interfaces';

interface PROPS {
  questionIndex: number;
  questionList: QUESTION[];
  handleAnswer: (index: number) => void;
  answers: number[];
}

export const AttemptQueston = (props: PROPS) => {
  const { questionIndex, questionList, handleAnswer, answers } = props;

  if (!questionList.length) {
    return (
      <div className="message">
        <span>Bộ đề hiện tại đang được update</span>
      </div>
    );
  }
  return (
    <div className="attempt-question">
      <div className="attempt-title">
        <span>
          Câu {questionIndex + 1}: {questionList[questionIndex]?.name}
        </span>
        {questionList[questionIndex]?.image && (
          <img src={questionList[questionIndex]?.image} alt="" />
        )}
      </div>
      <div className="attempt-answer">
        <form name={`question_${questionIndex}`}>
          {questionList[questionIndex]?.answers.map((item, index) => {
            return (
              <div key={`${questionList[questionIndex]._id}_${index}`}>
                <input
                  type="radio"
                  id={`answer_${index}`}
                  name={`answer_${questionIndex}`}
                  onChange={() => handleAnswer(index)}
                />
                <label
                  htmlFor={`answer_${index}`}
                  className={answers[questionIndex] === index ? 'active' : ''}
                >
                  <span>{item.name}</span>
                  {item.image && <img src={item.image} alt="" />}
                </label>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};
