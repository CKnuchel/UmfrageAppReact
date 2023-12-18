import { useState } from 'react';
import { useLoaderData } from "react-router";
import { getQuestions } from "../functions/get_questions";
import { createAnswer } from "../functions/create_answer";
import 'bootstrap/dist/css/bootstrap.min.css';

export async function loader() {
    return { data: await getQuestions() }
}

export default function Answer() {
    const { data } = useLoaderData();
    const [selectedQuestion, setSelectedQuestion] = useState({ id: '', text: '' });
    const [answers, setAnswers] = useState([]);

    const handleQuestionChange = (e) => {
        const question = data.find(item => item.question === e.target.value);
        setSelectedQuestion({ id: question.id, text: question.question });
        setAnswers([]);
    };

    const handleAnswerChange = (index, newValue) => {
        const newAnswers = [...answers];
        newAnswers[index] = newValue;
        setAnswers(newAnswers);
    };

    const addNewAnswer = () => {
        setAnswers([...answers, '']);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        for (const answerText of answers) {
            try {
                await createAnswer({ questionId: selectedQuestion.id, answer: answerText });
            } catch (error) {
                console.error('Fehler beim Senden der Antwort: ', error);
            }
        }
        // Zurücksetzen des Formulars
        setSelectedQuestion({ id: '', text: '' });
        setAnswers([]);
    };

    return (
        <div className="custom-container my-4">
            <h1 className="mb-3">Antworten</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="questionSelect" className="form-label">Wählen Sie eine Frage:</label>
                    <select 
                        id="questionSelect" 
                        className="form-select" 
                        value={selectedQuestion.text} 
                        onChange={handleQuestionChange}
                    >
                        <option value="">Frage auswählen...</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.question}>{item.question}</option>
                        ))}
                    </select>
                </div>
                {answers.map((answer, index) => (
                    <div key={index} className="mb-3">
                        <label htmlFor={`answerText-${index}`} className="form-label">Antwort {index + 1}:</label>
                        <textarea 
                            id={`answerText-${index}`} 
                            className="form-control" 
                            value={answer} 
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                        ></textarea>
                    </div>
                ))}
                <div className="mb-3 d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" className="btn btn-secondary me-md-2" onClick={addNewAnswer}>Antwort hinzufügen</button>
                <button type="submit" className="btn btn-primary">Bestätigen</button>
                </div>
            </form>
        </div>
    );
}
