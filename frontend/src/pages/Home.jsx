import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000"; // ha a backend más porton fut, írd át

export default function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    stylist_id: "",
    service_id: "",
    appointment_date: "",
    start_time: "",
    end_time: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // belépés + listák betöltése
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.user_id) {
      navigate("/login");
      return;
    }
    setUser(storedUser);

    // stylists
    fetch(`${API_BASE}/api/stylists`)
      .then((r) => r.json())
      .then((data) => setStylists(Array.isArray(data) ? data : []))
      .catch(() => {
        setStatus({ type: "error", message: "Nem sikerült betölteni a fodrászokat." });
      });

    // services
    fetch(`${API_BASE}/api/services`)
      .then((r) => r.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => {
        setStatus({ type: "error", message: "Nem sikerült betölteni a szolgáltatásokat." });
      });
  }, [navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      if (!user?.user_id) {
        throw new Error("Nem vagy bejelentkezve.");
      }

      if (
        !form.stylist_id ||
        !form.service_id ||
        !form.appointment_date ||
        !form.start_time ||
        !form.end_time
      ) {
        throw new Error("Minden mező kötelező.");
      }

      if (form.start_time >= form.end_time) {
        throw new Error("A kezdési időnek kisebbnek kell lennie a végidőnél.");
      }

      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: Number(user.user_id),
          stylist_id: Number(form.stylist_id),
          service_id: Number(form.service_id),
          appointment_date: form.appointment_date,
          start_time: form.start_time,
          end_time: form.end_time,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 409) {
        throw new Error(data?.message || "Ez az időpont már foglalt ennél a fodrásznál.");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Hiba történt a foglalásnál");
      }

      setStatus({
        type: "success",
        message: data?.message || "Sikeres foglalás!",
      });

      // ürítés
      setForm((p) => ({
        ...p,
        stylist_id: "",
        service_id: "",
        appointment_date: "",
        start_time: "",
        end_time: "",
      }));
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {/* Welcome rész */}
      <div className="text-center">
        <h1 className="mb-4">Üdvözlünk a Fodrász Szalonban!</h1>
        <p className="lead">
          Válaszd ki a szolgáltatást és foglalj időpontot online gyorsan és egyszerűen.
        </p>
        <img
          src="https://images.unsplash.com/photo-1600185363170-8c005109d1db?auto=format&fit=crop&w=800&q=80"
          alt="Hair Salon"
          className="img-fluid rounded mt-4 shadow"
        />
      </div>

      {/* Foglalás */}
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title mb-3">Időpont foglalás</h3>

              {/* User ID helyett név/email */}
              {user?.email && (
                <div className="alert alert-info">
                  Foglaló: <b>{user.name || user.email}</b>
                </div>
              )}

              <form onSubmit={onSubmit} className="d-grid gap-3">
                <div>
                  <label className="form-label">Fodrász</label>
                  <select
                    className="form-select"
                    name="stylist_id"
                    value={form.stylist_id}
                    onChange={onChange}
                    required
                  >
                    <option value="">Válassz fodrászt</option>
                    {stylists.map((st) => (
                      <option key={st.stylist_id} value={st.stylist_id}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Szolgáltatás / vágás</label>
                  <select
                    className="form-select"
                    name="service_id"
                    value={form.service_id}
                    onChange={onChange}
                    required
                  >
                    <option value="">Válassz szolgáltatást</option>
                    {services.map((s) => (
                      <option key={s.service_id} value={s.service_id}>
                        {s.name} — {Number(s.price).toLocaleString("hu-HU")} Ft
                        {s.duration_minutes ? ` (${s.duration_minutes} perc)` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Dátum</label>
                  <input
                    type="date"
                    className="form-control"
                    name="appointment_date"
                    value={form.appointment_date}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="row g-2">
                  <div className="col">
                    <label className="form-label">Kezdés</label>
                    <input
                      type="time"
                      className="form-control"
                      name="start_time"
                      value={form.start_time}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Vége</label>
                    <input
                      type="time"
                      className="form-control"
                      name="end_time"
                      value={form.end_time}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Foglalás..." : "Foglalás elküldése"}
                </button>
              </form>

              {status.message && (
                <div
                  className={`alert mt-3 ${
                    status.type === "success" ? "alert-success" : "alert-danger"
                  }`}
                >
                  {status.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}