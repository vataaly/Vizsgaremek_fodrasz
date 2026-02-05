import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("loggedIn", "true");
      navigate("/profile");
    } else {
      alert("Hibás adatok!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Bejelentkezés</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Jelszó"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success w-100">Belépés</button>
      </form>
    </div>
  );
}
