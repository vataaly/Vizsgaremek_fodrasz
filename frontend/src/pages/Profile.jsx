import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

export default function Profile() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("loggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Törléshez szükséges állapotok
  const [showConfirm, setShowConfirm] = useState(null); // Itt tároljuk a törlendő ID-t

  const fetchAppointments = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/appointments/user/${user.user_id}`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Hiba a betöltéskor");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loggedIn && user?.user_id) fetchAppointments();
  }, [loggedIn, user?.user_id]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/appointments/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAppointments(appointments.filter(a => a.appointment_id !== id));
        setShowConfirm(null);
      }
    } catch (err) {
      alert("Hiba a törlésnél");
    }
  };

  if (!loggedIn) return <Navigate to="/login" />;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
             <h3 className="fw-bold">{user.name || "Profilom"}</h3>
             <p className="text-muted">{user.email}</p>
             <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="btn btn-outline-danger w-100">Kijelentkezés</button>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold mb-4">Aktuális foglalásaim</h4>

            {appointments.length === 0 ? (
              <p>Nincs foglalásod.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Dátum</th>
                      <th>Szolgáltatás</th>
                      <th>Ár</th>
                      <th>Művelet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(app => (
                      <tr key={app.appointment_id}>
                        <td>{new Date(app.appointment_date).toLocaleDateString('hu-HU')} {app.start_time.slice(0,5)}</td>
                        <td>{app.service_name} ({app.stylist_name})</td>
                        <td className="fw-bold text-success">{Number(app.service_price).toLocaleString()} Ft</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => setShowConfirm(app.appointment_id)}
                          >
                            Lemondás
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LEMONDÁS MEGERŐSÍTÉSE (Overlay) */}
      {showConfirm && (
        <div className="modal-backdrop show" style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 shadow border-0">
                <div className="modal-body p-5 text-center">
                  <h3 className="fw-bold mb-3">Biztosan lemondod?</h3>
                  <p className="text-muted mb-4">Ez a művelet nem vonható vissza, az időpontod felszabadul mások számára.</p>
                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-secondary px-4 rounded-3" onClick={() => setShowConfirm(null)}>Mégse</button>
                    <button className="btn btn-danger px-4 rounded-3" onClick={() => handleDelete(showConfirm)}>Igen, lemondom</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}