import { useState } from "react";
import AuthService from "../functions/auth_service";
import { useNavigate, Link } from "react-router-dom"; // Importiere den Link-Komponenten

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // für Username
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  // für Password
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Verhindert das standardmäßige Absenden des Formulars

    AuthService.login(username, password) // AJAX Call ans Backend
      .then(() => {
        // Erfolg
        navigate("/tannenbaum");
        console.log("Login erfolgreich");
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} method="post" className="mt-3">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            id="username"
            value={username}
            onChange={onChangeUsername}
            name="username"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            id="password"
            value={password}
            onChange={onChangePassword}
            name="password"
            type="password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="mt-3">
        <p>Noch kein Konto? <Link to="/registrieren">Registrieren</Link></p> {/* Link zur Registrierungsseite */}
      </div>
    </div>
  );
}
