import axios from 'axios';

export async function checkIfQuestionIsAnswered(username, questionId) {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('question_id', questionId);

    try {
        const response = await axios.post('http://localhost:8080/responses/done', formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Erwartet `true` oder `false`
    } catch (error) {
        console.error('Fehler beim Überprüfen der Antwort auf die Frage:', error);
        return true; // Standardmäßig annehmen, dass die Frage beantwortet wurde, um weitere Fehler zu vermeiden
    }
}