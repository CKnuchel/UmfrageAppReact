import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8080",
});

const token = JSON.parse(localStorage.getItem("user")).accessToken;

export async function createAnswer(answerData) {
    try {
        // Verwendung von Axios für die POST-Anfrage
        const response = await client.post('/answers', answerData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });
        // Rückgabe des Antwortdatums von Axios (bereits JSON-parsed)
        return response.data;
    } catch (error) {
        // Werfen Sie hier einen Fehler mit einer angepassten Fehlermeldung
        throw new Error(`Fehler beim Senden der Antwort: ${error.response?.statusText || error.message}`);
    }
}
