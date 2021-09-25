import { QUESTION } from '../../interfaces';

interface PROPS {
  questionIndex: number;
  questionList: QUESTION[];
  handleAnswer: (index: number) => void;
}

const AttemptQueston = (props: PROPS) => {
  const { questionIndex, questionList, handleAnswer } = props;
  return (
    <div className="attempt-question">
      <div className="attempt-title">
        <span>
          Câu {questionIndex}: {questionList[questionIndex - 1]?.title}
        </span>
        {questionList[questionIndex - 1]?.image && (
          <img src={questionList[questionIndex - 1]?.image} alt="" />
        )}
      </div>
      <div className="attempt-answer">
        <form name={`question_${questionIndex}`}>
          {questionList[questionIndex - 1]?.answers.map((item, index) => {
            return (
              <div key={item._id}>
                <input
                  type="radio"
                  id={`answer_${index}`}
                  name={`answer_${questionIndex}`}
                  onChange={() => handleAnswer(index + 1)}
                />
                <label htmlFor={`answer_${index}`}>
                  <span>{item.value}</span>
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

export default AttemptQueston;
