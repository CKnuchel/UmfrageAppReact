import { useState, useEffect } from 'react';
import { ResponsesService } from './responsesService'; // Pfad anpassen

const AnswerQuestion = ({ questions, answers, currentUser }) => {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  useEffect(() => {
    // Filter Fragen, die noch nicht beantwortet wurden
    const checkAnswers = async () => {
      const unanswered = await Promise.all(questions.map(async (question) => {
        const response = await ResponsesService.checkIfAnswered(currentUser.username, question.id);
        return response.data.answered ? null : question;
      }));
      setUnansweredQuestions(unanswered.filter(question => question !== null));
    };
    checkAnswers();
  }, [questions, currentUser]);

  const handleSubmit = async () => {
    await ResponsesService.submitAnswer(selectedAnswer, currentUser.id);
    // Weitere Aktionen nach dem Absenden
  };

  return (
    <div>
      <h1>Frage Beantworten</h1>
      <select onChange={(e) => setSelectedQuestion(e.target.value)}>
        {unansweredQuestions.map(question => (
          <option key={question.id} value={question.id}>{question.text}</option>
        ))}
      </select>
      <div>
        {answers.map(answer => (
          <label key={answer.id}>
            <input 
              type="radio" 
              name="answer" 
              value={answer.id} 
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            {answer.text}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>Antworten</button>
    </div>
  );
};

export default AnswerQuestion;
