import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:3000";

export default function Home() {
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/stylists`).then(r => r.json()).then(data => setStylists(data || []));
    fetch(`${API_BASE}/api/services`).then(r => r.json()).then(data => setServices(data || []));
  }, []);

  return (
    <div>
      {/* Hero Szekció */}
      <div className="bg-dark text-white text-center py-5 mb-5" style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '400px', display: 'flex', alignItems: 'center'
      }}>
        <div className="container">
          <h1 className="display-3 fw-bold">Fodrász Szalon</h1>
          <p className="lead mb-4">Stílus, minőség és kikapcsolódás egy helyen.</p>
          <Link to="/booking" className="btn btn-primary btn-lg px-5 shadow">Időpontot foglalok</Link>
        </div>
      </div>

      <div className="container">
        {/* Fodrászok szekció */}
        <section className="mb-5">
          <h2 className="text-center mb-4">Mesterfodrászaink</h2>
          <div className="row g-4">
            {stylists.map(st => (
              <div key={st.stylist_id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-3">
                  <div className="mx-auto bg-light rounded-circle mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                    <span className="h3 mb-0 text-primary">{st.name.charAt(0)}</span>
                  </div>
                  <h5 className="card-title">{st.name}</h5>
                  <p className="text-muted small">Profi szakember</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Szolgáltatások szekció */}
        <section className="bg-light p-5 rounded-4 mb-5">
          <h2 className="text-center mb-4">Szolgáltatásaink</h2>
          <div className="row">
            {services.map(s => (
              <div key={s.service_id} className="col-md-6 mb-3">
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span>{s.name} <small className="text-muted">({s.duration_minutes} perc)</small></span>
                  <span className="fw-bold">{Number(s.price).toLocaleString()} Ft</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}