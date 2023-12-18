import axios from "axios";
 
const client = axios.create({
  baseURL: "http://localhost:8080",
});
 
/**
 * Holt öffentliche Inhalte.
 * @returns {Promise<Array>} Ein Array mit den öffentlichen Inhalten.
 */
export async function getPublicContent() {
 
    let data = [];

    await client.get("/public", {mode:'cors'})
      .then((response)=> {
        data = response.data;
      });

    return data;
  }

  export async function getPrivateContent() {
 
    let data = [];
    const token = JSON.parse(localStorage.getItem("user")).accessToken;

    await client.get("/private", { 
      headers: {"Authorization": `Bearer ${token}`, 
      mode:'cors'} })
      .then((response)=> {
        data = response.data;
      });
      
    return data;
  }