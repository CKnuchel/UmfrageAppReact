import { useLoaderData } from "react-router-dom";
import { getQuestions } from "../functions/get_questions";
import { createQuestion } from "../functions/create_question";
import 'bootstrap/dist/css/bootstrap.min.css';


export async function loader() {
    return { data: await getQuestions() }
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

    return (
        <div className="custom-container my-4">
            <h1 className="mb-3">Questions</h1>
            <p>Hier sind alle erfassten Fragen</p>
            <ul className="list-group mb-4">
                {data.map((item, index) => (
                    <li key={index} className="list-group-item">{item.question}</li>
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


