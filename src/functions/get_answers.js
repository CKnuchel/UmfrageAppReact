import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8080",
  });

export async function getAnswers(id) {
    let data = [];
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    await client.get(`/answers/${id}`, { 
      headers: {"Authorization": `Bearer ${token}`, 
      mode:'cors'} })
      .then((response)=> {
        data = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
    }