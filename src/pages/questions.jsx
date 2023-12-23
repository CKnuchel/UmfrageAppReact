import { useLoaderData } from "react-router-dom";
import { getQuestions } from "../functions/get_questions";
import { createQuestion } from "../functions/create_question";
import axios from 'axios'; // Stellen Sie sicher, dass Axios installiert ist
import 'bootstrap/dist/css/bootstrap.min.css';

export async function loader() {
    return { data: await getQuestions() };
}

export default function Questions() {
    const { data } = useLoaderData();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const question = formData.get('question');
        await createQuestion({ question });
        window.location.reload();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Möchten Sie diese Frage wirklich löschen?')) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user?.accessToken;

                await axios.delete(`http://localhost:8080/questions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Authentifizierungstoken im Request-Header
                    },
                });

                window.location.reload();
            } catch (error) {
                console.error('Fehler beim Löschen der Frage:', error);
            }
        }
    };

    return (
        <div className="custom-container my-4">
            <h1 className="mb-3">Fragen</h1>
            <p>Hier sind alle erfassten Fragen</p>
            <ul className="list-group mb-4">
                {data.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.question}
                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">Löschen</button>
                    </li>
                ))}
            </ul>
            <p>Erfassen einer neuen Frage</p>
            <form onSubmit={handleFormSubmit} className="mb-3">
                <div className="mb-3">
                    <label htmlFor="questionInput" className="form-label">Frage:</label>
                    <input 
                        id="questionInput" 
                        name="question" 
                        type="text" 
                        className="form-control" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Speichern</button>
            </form>
        </div>
    );
}