import { useState } from "react";
import AuthService from "../functions/auth_service";
import { useNavigate } from "react-router-dom";

export default function Regist() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // für Username
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  // für E-Mail
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  // für Password
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // für Rolle
  const onChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Registrierung des Benutzers
    AuthService.registerRole(username, email, password, role)
      .then(() => {
        // Erfolg
        navigate("/");
        console.log("Registrierung erfolgreich");
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Registrierung</h1>
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
          <label htmlFor="email" className="form-label">E-Mail:</label>
          <input
            id="email"
            value={email}
            onChange={onChangeEmail}
            name="email"
            type="email"
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
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Rolle:</label>
          <select id="role" name="role" className="form-select" value={role} onChange={onChangeRole}>
            <option value="">Bitte wählen...</option>
            <option value="user">Benutzer</option>
            <option value="admin">Administrator</option>
            {/* Weitere Rollen können hier hinzugefügt werden */}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Registrieren</button>
      </form>
    </div>
  );
}
