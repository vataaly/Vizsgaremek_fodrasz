import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

export default function Booking() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);
  const [occupiedSlots, setOccupiedSlots] = useState([]);

  const [formData, setFormData] = useState({
    stylistId: "",
    serviceId: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

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

  // --- JAVÍTOTT: Foglalt időpontok lekérése szűréssel ---
  useEffect(() => {
    if (formData.date && formData.stylistId) {
      setOccupiedSlots([]); 
      fetch(`${API_BASE}/api/appointments?date=${formData.date}&stylistId=${formData.stylistId}`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) setOccupiedSlots(data);
        })
        .catch(() => setOccupiedSlots([]));
    }
  }, [formData.date, formData.stylistId]);

  const getTimeOptions = () => {
    if (!formData.date) return [];
    const selectedDate = new Date(formData.date);
    const day = selectedDate.getDay();
    if (day === 0) return []; 

    let startHour = 8;
    let endHour = 20;
    if (day === 6) { startHour = 10; endHour = 18; }

    const options = [];
    for (let h = startHour; h < endHour; h++) {
      ["00", "15", "30", "45"].forEach(m => {
        options.push(`${String(h).padStart(2, '0')}:${m}`);
      });
    }
    return options;
  };

  // --- JAVÍTOTT: Időpont ütközés ellenőrzése ---
  const isSlotOccupied = (time) => {
    return occupiedSlots.some(slot => {
      const s = slot.start_time.substring(0, 5);
      const e = slot.end_time.substring(0, 5);
      return time >= s && time < e;
    });
  };

  useEffect(() => {
    if (formData.serviceId && formData.startTime) {
      const selectedService = services.find(s => s.service_id === Number(formData.serviceId));
      if (selectedService) {
        const [hours, minutes] = formData.startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + selectedService.duration_minutes;
        const endH = Math.floor(totalMinutes / 60) % 24;
        const endM = totalMinutes % 60;
        setFormData(prev => ({ ...prev, endTime: `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}` }));
      }
    }
  }, [formData.serviceId, formData.startTime, services]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const day = new Date(value).getDay();
      if (day === 0) {
        setStatus({ type: "danger", message: "Vasárnap zárva vagyunk!" });
        setFormData(prev => ({ ...prev, date: "" }));
        return;
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Hiba történt.");
      setStatus({ type: "success", message: "Sikeres foglalás!" });
      setFormData({ stylistId: "", serviceId: "", date: "", startTime: "", endTime: "" });
    } catch (err) {
      setStatus({ type: "danger", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4 p-3 p-md-4">
            <h2 className="text-center fw-bold mb-4">Időpont foglalás</h2>
            {status.message && <div className={`alert alert-${status.type} border-0 shadow-sm`}>{status.message}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Szolgáltatás</label>
                <select className="form-select form-select-lg" name="serviceId" value={formData.serviceId} onChange={handleChange} required>
                  <option value="">Válassz szolgáltatást...</option>
                  {services.map(s => <option key={s.service_id} value={s.service_id}>{s.name} ({s.duration_minutes} perc)</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Fodrász</label>
                <select className="form-select form-select-lg" name="stylistId" value={formData.stylistId} onChange={handleChange} required>
                  <option value="">Kihez szeretnél jönni?</option>
                  {stylists.map(st => <option key={st.stylist_id} value={st.stylist_id}>{st.name}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Dátum</label>
                <input type="date" className="form-control form-control-lg" name="date" min={today} value={formData.date} onChange={handleChange} required />
              </div>

              <div className="row g-3">
                <div className="col-12 col-sm-6 mb-3">
                  <label className="form-label fw-bold">Kezdés</label>
                  <select className="form-select form-select-lg" name="startTime" value={formData.startTime} onChange={handleChange} required disabled={!formData.date || !formData.stylistId}>
                    <option value="">Időpont...</option>
                    {getTimeOptions().map(time => {
                      const occupied = isSlotOccupied(time);
                      return (
                        <option key={time} value={time} disabled={occupied} style={occupied ? { color: "red", textDecoration: "line-through" } : {}}>
                          {time} {occupied ? " (FOGLALT)" : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-12 col-sm-6 mb-3">
                  <label className="form-label fw-bold text-muted">Vége (becsült)</label>
                  <input type="text" className="form-control form-control-lg bg-light" value={formData.endTime} readOnly placeholder="--:--" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100 py-3 mt-3 shadow" disabled={loading || !formData.startTime}>
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : "Foglalás véglegesítése"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}