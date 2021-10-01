export const answersSuccess = (questions: any, data: number[]) => {
  let totalSuccess = 0;
  if (!data) return totalSuccess;
  data.forEach((item, index) => {
    if (item === (null || undefined || -1)) return;
    const result = questions[index].answers[item];
    if (result.isCorrect) {
      totalSuccess++;
    }
  });
  return totalSuccess;
};

export const answersError = (questions: any, data: number[]) => {
  let totalError = 0;
  data.forEach((item, index) => {
    if (item === (null || undefined || -1)) return;
    const result = questions[index].answers[item];
    if (!result.isCorrect) {
      totalError++;
    }
  });
  return totalError;
};

export const answersEmpty = (totalSucess: number, totalError: number, questions: any) => {
  return questions.length - totalSucess - totalError;
};

export const calceScore = (totalSucces: number, question: any) => {
  return Math.floor(10 * question.length * totalSucces);
};

export const checkAnswersList = (questions: any, data: number[]) => {
  const newAnswers = [...data];
  data.forEach((item, index) => {
    if (item === (null || undefined || -1)) return;
    console.log(questions);
    const result = questions[index].answers[item];
    if (!result.isCorrect) {
      newAnswers[index] = 0;
    } else {
      newAnswers[index] = 1;
    }
  });
  return newAnswers;
};
