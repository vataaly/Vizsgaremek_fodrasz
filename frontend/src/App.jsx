import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";

import Impresszum from "./pages/Impresszum";
import Adatvedelem from "./pages/Adatvedelem";
import Cookie from "./pages/Cookie";

// Ha van itt import "./App.css"; sor, azt TÖRÖLD KI!

export default function App() {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/impresszum" element={<Impresszum />} />
          <Route path="/adatvedelem" element={<Adatvedelem />} />
          <Route path="/cookie" element={<Cookie />} />
        </Routes>
      </main>

      <Footer />
      <CookieBanner />
    </Router>
  );
}