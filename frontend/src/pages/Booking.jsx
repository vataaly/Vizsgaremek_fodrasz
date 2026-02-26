import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

export default function Booking() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    stylistId: "",
    serviceId: "",
    date: "",
    startTime: "",
    endTime: "", // Ez automatikusan fog frissülni
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.user_id) {
      navigate("/login");
      return;
    }
    setUser(storedUser);

    Promise.all([
      fetch(`${API_BASE}/api/stylists`).then((r) => r.json()),
      fetch(`${API_BASE}/api/services`).then((r) => r.json()),
    ])
      .then(([stylistData, serviceData]) => {
        setStylists(Array.isArray(stylistData) ? stylistData : []);
        setServices(Array.isArray(serviceData) ? serviceData : []);
      })
      .catch(() => setStatus({ type: "danger", message: "Hiba az adatok betöltésekor." }));
  }, [navigate]);

  // --- AUTOMATIKUS IDŐSZÁMÍTÁS LOGIKA ---
  useEffect(() => {
    if (formData.serviceId && formData.startTime) {
      // Megkeressük a kiválasztott szolgáltatást az adatok között
      const selectedService = services.find(s => s.service_id === Number(formData.serviceId));
      
      if (selectedService && selectedService.duration_minutes) {
        // Idő szétszedése órára és percre
        const [hours, minutes] = formData.startTime.split(':').map(Number);
        
        // Összes perc kiszámítása + a szolgáltatás hossza
        const totalMinutes = hours * 60 + minutes + selectedService.duration_minutes;
        
        // Új óra és perc kiszámítása
        const endHours = Math.floor(totalMinutes / 60) % 24; // %24 ha éjfél utánra nyúlna
        const endMinutes = totalMinutes % 60;
        
        // Formázás HH:mm formátumra
        const formattedEndTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
        
        setFormData(prev => ({ ...prev, endTime: formattedEndTime }));
      }
    }
  }, [formData.serviceId, formData.startTime, services]);
  // --------------------------------------

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          stylist_id: Number(formData.stylistId),
          service_id: Number(formData.serviceId),
          appointment_date: formData.date,
          start_time: formData.startTime,
          end_time: formData.endTime,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Hiba történt.");

      setStatus({ type: "success", message: "Időpont sikeresen lefoglalva!" });
      setFormData({ stylistId: "", serviceId: "", date: "", startTime: "", endTime: "" });
    } catch (err) {
      setStatus({ type: "danger", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Időpont foglalás</h2>
          </div>

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              {status.message && <div className={`alert alert-${status.type} border-0 rounded-3 mb-4`}>{status.message}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Választható szolgáltatás</label>
                  <select className="form-select form-select-lg" name="serviceId" value={formData.serviceId} onChange={handleChange} required>
                    <option value="">Válassz szolgáltatást...</option>
                    {services.map((s) => (
                      <option key={s.service_id} value={s.service_id}>
                        {s.name} — {Number(s.price).toLocaleString()} Ft ({s.duration_minutes} perc)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">Fodrász kiválasztása</label>
                  <select className="form-select form-select-lg" name="stylistId" value={formData.stylistId} onChange={handleChange} required>
                    <option value="">Kihez szeretnél jönni?</option>
                    {stylists.map((st) => (
                      <option key={st.stylist_id} value={st.stylist_id}>{st.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">Dátum</label>
                  <input type="date" className="form-control form-control-lg" name="date" value={formData.date} onChange={handleChange} required />
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label className="form-label fw-medium">Kezdés</label>
                    <input type="time" className="form-control form-control-lg" name="startTime" value={formData.startTime} onChange={handleChange} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-medium text-muted">Vége (számított)</label>
                    <input 
                        type="time" 
                        className="form-control form-control-lg bg-light" 
                        name="endTime" 
                        value={formData.endTime} 
                        readOnly // A felhasználó nem tudja módosítani
                        placeholder="--:--" 
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 rounded-3 py-3 shadow-sm" disabled={loading || !formData.endTime}>
                  {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                  Foglalás véglegesítése
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}