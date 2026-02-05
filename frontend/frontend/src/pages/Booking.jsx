import { useState } from "react";

export default function Booking() {
  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ service, stylist, date, time });
    alert("Foglalás rögzítve (dummy)!");
    setService(""); setStylist(""); setDate(""); setTime("");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4 text-center">Időpont foglalás</h2>
        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Szolgáltatás</label>
            <select className="form-select" value={service} onChange={e=>setService(e.target.value)} required>
              <option value="">Válassz szolgáltatást</option>
              <option value="hajvagas">Hajvágás</option>
              <option value="festes">Festés</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Fodrász</label>
            <select className="form-select" value={stylist} onChange={e=>setStylist(e.target.value)} required>
              <option value="">Válassz fodrászt</option>
              <option value="kata">Kata</option>
              <option value="zsuzsi">Zsuzsi</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Dátum</label>
            <input type="date" className="form-control" value={date} onChange={e=>setDate(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Idő</label>
            <input type="time" className="form-control" value={time} onChange={e=>setTime(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-warning w-100">Foglalás</button>
        </form>
      </div>
    </div>
  );
}
