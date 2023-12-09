import { useState } from "react";
import AuthService from "../functions/auth.service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // for Username
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  // for password
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // verhindert das standardmässige Absenden des Formulars

    AuthService.login(username, password) // AJAX call ans Backend
      .then(() => {
        // Erfolg
        navigate("/public");
        console.log("Login erfolgreich");
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} method="post">
        <label>
          Username:
          <input
            value={username}
            onChange={onChangeUsername}
            name="username"
            type="text"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            value={password}
            onChange={onChangePassword}
            name="password"
            type="password"
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
