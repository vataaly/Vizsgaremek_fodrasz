import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000"; // ha a backend más porton fut, írd át

export default function Booking() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);

  const [stylistId, setStylistId] = useState("");
  const [serviceId, setServiceId] = useState("");

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // belépés ellenőrzés + listák betöltése
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser?.user_id) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    // Fodrászok betöltése
    fetch(`${API_BASE}/api/stylists`)
      .then((res) => res.json())
      .then((data) => setStylists(Array.isArray(data) ? data : []))
      .catch(() => setError("Nem sikerült betölteni a fodrászokat."));

    // Szolgáltatások betöltése
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => setError("Nem sikerült betölteni a szolgáltatásokat."));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user?.user_id) {
      setError("Nem vagy bejelentkezve.");
      navigate("/login");
      return;
    }

    if (!serviceId || !stylistId || !date || !startTime || !endTime) {
      setError("Minden mező kötelező.");
      return;
    }

    if (startTime >= endTime) {
      setError("A kezdési időnek kisebbnek kell lennie a végidőnél.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          stylist_id: Number(stylistId),
          service_id: Number(serviceId),
          appointment_date: date,
          start_time: startTime,
          end_time: endTime,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setError(data.message || "Ez az időpont már foglalt ennél a fodrásznál.");
        return;
      }

      if (!res.ok) {
        setError(data.message || "Szerver hiba történt a foglalás során.");
        return;
      }

      setSuccess("Időpont sikeresen lefoglalva!");
      setServiceId("");
      setStylistId("");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch {
      setError("Nem sikerült csatlakozni a szerverhez.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-7 col-lg-6">
        <h2 className="mb-4 text-center">Időpont foglalás</h2>

        {/* User ID helyett név/email megjelenítés */}
        {user?.email && (
          <div className="alert alert-info">
            Foglaló: <b>{user.name || user.email}</b>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          {/* Szolgáltatás (vágás) */}
          <div className="mb-3">
            <label className="form-label">Milyen vágást / szolgáltatást kérsz?</label>
            <select
              className="form-select"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
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

          {/* Fodrász */}
          <div className="mb-3">
            <label className="form-label">Fodrász</label>
            <select
              className="form-select"
              value={stylistId}
              onChange={(e) => setStylistId(e.target.value)}
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

          {/* Dátum */}
          <div className="mb-3">
            <label className="form-label">Dátum</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Kezdés / Vége */}
          <div className="row g-2">
            <div className="col-md-6 mb-3">
              <label className="form-label">Kezdés</label>
              <input
                type="time"
                className="form-control"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Vége</label>
              <input
                type="time"
                className="form-control"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Foglalás elküldése
          </button>
        </form>
      </div>
    </div>
  );
}