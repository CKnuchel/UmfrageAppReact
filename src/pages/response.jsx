import { useState } from 'react';
import { useLoaderData } from "react-router";
import { getQuestions } from "../functions/get_questions";
import { getAnswers } from '../functions/get_answers';
import 'bootstrap/dist/css/bootstrap.min.css';

export async function loader() {
    return { 
        data: await getQuestions()
    }
}

export default function Response() {
    const { data } = useLoaderData();
    const [selectedQuestion, setSelectedQuestion] = useState({ id: '', text: '' });
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const token = JSON.parse(localStorage.getItem('user'));

    const handleQuestionChange = async (e) => {
        const question = data.find(item => item.id.toString() === e.target.value);
        if (question) {
            setSelectedQuestion({ id: question.id, text: question.question });
            const answers = await getAnswers(question.id);
            setAnswers(answers);
            setSelectedAnswer(null);
        } else {
            setSelectedQuestion({ id: '', text: '' });
            setAnswers([]);
            setSelectedAnswer(null);
        }
    };

    const handleRadioChange = (answerId) => {
        setSelectedAnswer(answerId);
    };

    const handleSubmit = async () => {
        const userId = token.id;
        const accessToken = token.accessToken;

        if (selectedAnswer !== null) {
            try {
                let formData = new FormData();
                formData.append('user_id', userId);
                formData.append('answer_id', selectedAnswer);

                const response = await fetch('http://localhost:8080/responses', {
                    method: 'POST',
                    headers: {
                        // 'Content-Type': 'multipart/form-data' ist nicht notwendig, da der Browser es automatisch hinzufügt
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                console.log("Antwort erfolgreich gesendet!");
                window.location.reload();
            } catch (error) {
                console.error("Ein Fehler ist aufgetreten beim Senden der Antwort: ", error);
            }
        } else {
            console.error("Keine Antwort ausgewählt!");
        }
    };

    return (
        <div className="custom-container my-4">
            <h1 className="mb-3">Fragen beantworten</h1>
            <div className="mb-3">
                <label htmlFor="questionSelect" className="form-label">Wählen Sie eine Frage:</label>
                <select 
                    id="questionSelect" 
                    className="form-select" 
                    value={selectedQuestion.text} 
                    onChange={handleQuestionChange}
                >
                    <option value="">Frage auswählen...</option>
                    {data.map((item) => (
                        <option key={item.id} value={item.id}>{item.question}</option>
                    ))}
                </select>
            </div>
            <br />
            <div className="mb-3">
                <ul className="list-group">
                    {answers.map((answer) => (
                        <li key={answer.answerId} className="list-group-item">
                            <input 
                                type="radio" 
                                name="responseRadio"
                                checked={selectedAnswer === answer.answerId}
                                onChange={() => handleRadioChange(answer.answerId)} 
                            /> {answer.answer}
                        </li>
                    ))}
                </ul>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Antwort senden</button>     
        </div>
    );
}
