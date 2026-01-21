import { Navigate } from "react-router-dom";

export default function Profile() {
  const loggedIn = localStorage.getItem("loggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5">
      <h1>Profil</h1>
      <p>Bejelentkezve mint:</p>
      <h4 className="text-primary">{user.email}</h4>
    </div>
  );
}
