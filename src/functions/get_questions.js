import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8080",
  });

export async function getQuestions() {
    let data = [];
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    await client.get("/questions", { 
      headers: {"Authorization": `Bearer ${token}`, 
      mode:'cors'} })
      .then((response)=> {
        data = response.data;
      });
    return data;
    }