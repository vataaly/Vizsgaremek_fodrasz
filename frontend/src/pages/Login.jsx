import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000"; // ha a backend más porton fut, írd át

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Hibás adatok!");
        return;
      }

      // jelszót sose tárolj localStorage-ben
      localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: data.user_id,
          email: data.email,
          name: data.name ?? null,
          phone: data.phone ?? null,
        })
      );

      localStorage.setItem("loggedIn", "true");
      navigate("/profile");
    } catch {
      setError("Nem sikerült csatlakozni a szerverhez.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 520 }}>
      <h2>Bejelentkezés</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleLogin}>
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

        <button className="btn btn-success w-100">Belépés</button>
      </form>
    </div>
  );
}
