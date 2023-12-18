/**
 * Erstellt eine Antwort durch Senden der Antwortdaten an den Server.
 * @param {Object} answerData - Die Antwortdaten, die gesendet werden sollen.
 * @returns {Promise<Object>} - Ein Promise, das das Antwortdatum enthält.
 * @throws {Error} - Ein Fehler, der auftritt, wenn das Senden der Antwort fehlschlägt.
 */
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8080",
});



export async function createAnswer(answerData) {
    try {
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
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
