import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>Regisztráció</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-primary w-100">Regisztráció</button>
      </form>
    </div>
  );
}
