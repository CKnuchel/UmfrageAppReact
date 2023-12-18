import axios from 'axios';

const API_URL = 'http://localhost:8080';

const client = axios.create({ baseURL: API_URL });

const token = JSON.parse(localStorage.getItem("user")).accessToken;

// Funktion, um das Token zu holen und zu parsen
const getUserFromToken = () => {
  const username = JSON.parse(localStorage.getItem('user')).username;
};

// Funktion, um zu überprüfen, ob eine Frage beantwortet wurde
const checkQuestionAnswered = async (questionId) => {
  const user = getUserFromToken();
    try {
        const response = await client.post('/responses/done', {
            username: user.username,
            question_id: questionId,
            headers: { "Authorization": `Bearer ${token}` },
            mode: 'cors'
        });
        return response.data;
    } catch (error) {
        console.error('Fehler beim Überprüfen der Frage:', error);
        throw error;
    }
};

// Funktion, um eine Antwort zu senden
// senden als mutlipart and localhost:8080/responses als POST (user_id, answer_id)

// Funktion, um die Antwort zu speichern
const saveResponse = async (questionId, answerId) => {
    const user = getUserFromToken();
        try {
            const response = await client.post('/responses', {
                username: user.username,
                answer_id: answerId,
                headers: { "Authorization": `Bearer ${token}` },
                mode: 'cors'
            });
            return response.data;
        } catch (error) {
            console.error('Fehler beim Speichern der Antwort:', error);
            throw error;
        }
    }


export const ResponsesService = {
  checkQuestionAnswered,
    saveResponse
};
