import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000"; // ha a backend más porton fut, írd át

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_BASE}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setError(data.message || "Már létezik fiók ezzel az emaillel.");
        return;
      }

      if (!res.ok) {
        setError(data.message || "Szerver hiba történt.");
        return;
      }

      setSuccess("Sikeres regisztráció! Most be tudsz jelentkezni.");
      setTimeout(() => navigate("/login"), 600);
    } catch {
      setError("Nem sikerült csatlakozni a szerverhez.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 520 }}>
      <h2>Regisztráció</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Jelszó"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">Regisztráció</button>
      </form>
    </div>
  );
}
