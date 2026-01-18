import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    alert("Regisztráció sikeres (dummy)!");
    setName(""); setEmail(""); setPassword("");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4 text-center">Regisztráció</h2>
        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Név</label>
            <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Jelszó</label>
            <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Regisztrálok</button>
        </form>
      </div>
    </div>
  );
}
