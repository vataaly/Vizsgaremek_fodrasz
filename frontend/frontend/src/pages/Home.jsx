import { useState } from "react";
 
export default function Home() {

  const [form, setForm] = useState({

    user_id: 1,

    stylist_id: 1,

    service_id: 1,

    appointment_date: "",

    start_time: "",

    end_time: "",

  });
 
  const [status, setStatus] = useState({ type: "", message: "" });

  const [loading, setLoading] = useState(false);
 
  const onChange = (e) => {

    const { name, value } = e.target;

    setForm((p) => ({ ...p, [name]: value }));

  };
 
  const onSubmit = async (e) => {

    e.preventDefault();

    setStatus({ type: "", message: "" });

    setLoading(true);
 
    try {

      const res = await fetch("http://localhost:3000/api/appointments", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({

          user_id: Number(form.user_id),

          stylist_id: Number(form.stylist_id),

          service_id: Number(form.service_id),

          appointment_date: form.appointment_date,

          start_time: form.start_time,

          end_time: form.end_time,

        }),

      });
 
      const data = await res.json().catch(() => ({}));
 
      if (!res.ok) {

        throw new Error(data?.message || "Hiba történt a foglalásnál");

      }
 
      setStatus({ type: "success", message: data?.message || "Sikeres foglalás!" });
 
      // opcionális: ürítés

      setForm((p) => ({

        ...p,

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

      {/* Meglévő welcome rész */}
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
 
      {/* ÚJ: Foglalás */}
<div className="row justify-content-center mt-5">
<div className="col-12 col-md-8 col-lg-6">
<div className="card shadow">
<div className="card-body">
<h3 className="card-title mb-3">Időpont foglalás</h3>
 
              <form onSubmit={onSubmit} className="d-grid gap-3">
<div>
<label className="form-label">User ID</label>
<input

                    className="form-control"

                    name="user_id"

                    value={form.user_id}

                    onChange={onChange}

                  />
</div>
 
                <div>
<label className="form-label">Stylist ID</label>
<input

                    className="form-control"

                    name="stylist_id"

                    value={form.stylist_id}

                    onChange={onChange}

                  />
</div>
 
                <div>
<label className="form-label">Service ID</label>
<input

                    className="form-control"

                    name="service_id"

                    value={form.service_id}

                    onChange={onChange}

                  />
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
<div className={`alert mt-3 ${status.type === "success" ? "alert-success" : "alert-danger"}`}>

                  {status.message}
</div>

              )}
 
              <small className="text-muted d-block mt-2">

                (Később ezt lecseréljük dropdownokra: stylist lista, szolgáltatás lista, stb.)
</small>
</div>
</div>
</div>
</div>
</div>

  );

}

 