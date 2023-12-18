import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  // Zustand, der überwacht, ob ein Token vorhanden ist
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Überprüfen, ob ein Token im Local Storage gespeichert ist
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Startseite</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/questions">Fragen</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/answer">Antworten</Link>
            </li>
          {isLoggedIn ? (
            <li className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
