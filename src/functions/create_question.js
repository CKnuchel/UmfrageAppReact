/**
 * Erstellt eine Frage und sendet sie an den Server.
 * @param {string} question - Die Frage, die erstellt werden soll.
 * @returns {Promise} - Ein Promise-Objekt, das die Serverantwort enthält.
 */
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8080",
    });

// Frage erstellen -> http://localhost:8080/questions
// POST
// 	"question" : "Isch d Jason e Gott?"
//

export async function createQuestion(question) {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    try {
        const response = await client.post("/questions", question, {
            headers: { "Authorization": `Bearer ${token}` },
            mode: 'cors'
        });
        return response;
    } catch (error) {
        console.error("Fehler beim Erstellen der Frage:", error);
        // Optional: Fehlerbehandlung
    }
}