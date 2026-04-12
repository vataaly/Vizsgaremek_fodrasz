import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

export default function Booking() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);
  const [occupiedSlots, setOccupiedSlots] = useState([]); // Már lefoglalt idők

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

  // --- Foglalt időpontok lekérése, ha változik a fodrász vagy a dátum ---
  useEffect(() => {
    if (formData.date && formData.stylistId) {
      fetch(`${API_BASE}/api/appointments?date=${formData.date}&stylistId=${formData.stylistId}`)
        .then(r => r.json())
        .then(data => setOccupiedSlots(data)) // Feltételezzük, hogy a backend visszaadja a [ {start_time, end_time}, ... ] listát
        .catch(() => setOccupiedSlots([]));
    }
  }, [formData.date, formData.stylistId]);

  // --- Dinamikus időpont generálás nyitvatartás szerint ---
  const getTimeOptions = () => {
    if (!formData.date) return [];
    
    const selectedDate = new Date(formData.date);
    const day = selectedDate.getDay(); // 0: Vasárnap, 6: Szombat

    if (day === 0) return []; // Vasárnap zárva

    let startHour = 8;
    let endHour = 20;

    if (day === 6) { // Szombat
      startHour = 10;
      endHour = 18;
    }

    const options = [];
    for (let h = startHour; h < endHour; h++) {
      ["00", "15", "30", "45"].forEach(m => {
        options.push(`${String(h).padStart(2, '0')}:${m}`);
      });
    }
    return options;
  };

  // Segédfüggvény: megmutatja, hogy egy adott időpont foglalt-e
  const isSlotOccupied = (time) => {
    return occupiedSlots.some(slot => {
      return time >= slot.start_time && time < slot.end_time;
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
    // Vasárnap tiltása manuális választásnál is
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
    if (isSlotOccupied(formData.startTime)) {
      setStatus({ type: "danger", message: "Sajnáljuk, ezt az időpontot épp most foglalták le." });
      return;
    }
    
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
      if (!res.ok) throw new Error("Hiba a foglalás során.");
      setStatus({ type: "success", message: "Sikeres foglalás!" });
      setFormData({ stylistId: "", serviceId: "", date: "", startTime: "", endTime: "" });
    } catch (err) {
      setStatus({ type: "danger", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow border-0 p-4">
        <h2 className="text-center mb-4">Időpont foglalás</h2>
        {status.message && <div className={`alert alert-${status.type}`}>{status.message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Szolgáltatás</label>
            <select className="form-select" name="serviceId" value={formData.serviceId} onChange={handleChange} required>
              <option value="">Válassz...</option>
              {services.map(s => <option key={s.service_id} value={s.service_id}>{s.name} ({s.duration_minutes} perc)</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Fodrász</label>
            <select className="form-select" name="stylistId" value={formData.stylistId} onChange={handleChange} required>
              <option value="">Válassz...</option>
              {stylists.map(st => <option key={st.stylist_id} value={st.stylist_id}>{st.name}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Dátum</label>
            <input type="date" className="form-control" name="date" min={today} value={formData.date} onChange={handleChange} required />
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">Kezdés</label>
              <select className="form-select" name="startTime" value={formData.startTime} onChange={handleChange} required disabled={!formData.date || !formData.stylistId}>
                <option value="">Időpont...</option>
                {getTimeOptions().map(time => {
                  const occupied = isSlotOccupied(time);
                  return (
                    <option key={time} value={time} disabled={occupied} style={occupied ? { textDecoration: "line-through", color: "red" } : {}}>
                      {time} {occupied ? " (FOGLALT)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Vége</label>
              <input type="text" className="form-control bg-light" value={formData.endTime} readOnly placeholder="--:--" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-3" disabled={loading || !formData.startTime}>
            {loading ? "Folyamatban..." : "Foglalás véglegesítése"}
          </button>
        </form>
      </div>
    </div>
  );
}