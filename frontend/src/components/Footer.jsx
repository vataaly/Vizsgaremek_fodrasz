import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">

        <p className="mb-2">
          © {new Date().getFullYear()} Fodrász Szalon
        </p>

        <div className="d-flex justify-content-center gap-3">

          <Link className="text-white text-decoration-none" to="/impresszum">
            Impresszum
          </Link>

          <Link className="text-white text-decoration-none" to="/adatvedelem">
            Adatvédelem
          </Link>

          <Link className="text-white text-decoration-none" to="/cookie">
            Cookie szabályzat
          </Link>

        </div>

      </div>
    </footer>
  );
}

