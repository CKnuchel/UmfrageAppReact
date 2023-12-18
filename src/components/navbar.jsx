import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Startseite</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/questions">Fragen anzeigen / erfassen</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/answer">Antworten anzeigen / erfassen</Link>
          </li>
          {/* Weitere Nav-Links hier */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
