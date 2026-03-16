import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedIn = localStorage.getItem("loggedIn");

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user"); // Érdemes a felhasználói adatokat is törölni kilépéskor
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* Logó / Márkanév */}
      <Link className="navbar-brand" to="/">
        Fodrász Szalon
      </Link>

      {/* Menüpontok konténere */}
      <div className="ms-auto d-flex align-items-center gap-3">
        <Link className="nav-link text-white" to="/">
          Főoldal
        </Link>

        <Link className="nav-link text-white" to="/booking">
          Foglalás
        </Link>

        {/* Bejelentkezés/Regisztráció - Csak ha NINCS bejelentkezve */}
        {!loggedIn && (
          <>
            <Link className="nav-link text-white" to="/login">
              Bejelentkezés
            </Link>
            <Link className="nav-link text-white" to="/register">
              Regisztráció
            </Link>
          </>
        )}

        {/* Felhasználói menü - Csak ha BE VAN jelentkezve */}
        {loggedIn && (
          <>
            <span className="text-white">
              Szia, <b>{user?.email}</b>
            </span>

            <Link className="btn btn-outline-light btn-sm" to="/profile">
              Profil
            </Link>

            <button className="btn btn-danger btn-sm" onClick={logout}>
              Kilépés
            </button>
          </>
        )}
      </div>
    </nav>
  );
}