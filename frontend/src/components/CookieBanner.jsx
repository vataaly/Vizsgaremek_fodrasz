import { useState, useEffect } from "react";

export default function CookieBanner() {

  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (!accepted) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="position-fixed bottom-0 start-0 end-0 bg-dark text-white p-3 shadow"
      style={{ zIndex: 9999 }}
    >
      <div className="container d-flex justify-content-between align-items-center">

        <span>
          Ez a weboldal cookie-kat használ a jobb felhasználói élmény érdekében.
        </span>

        <button
          className="btn btn-primary btn-sm"
          onClick={acceptCookies}
        >
          Elfogadom
        </button>

      </div>
    </div>
  );
}

