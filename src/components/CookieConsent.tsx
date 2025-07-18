import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check localStorage for consent
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("analyticsConsent");
      setVisible(consent !== "true");
    }
  }, []);

  const acceptCookies = () => {
    if (typeof window !== "undefined") {
      window.analyticsConsent = true;
      localStorage.setItem("analyticsConsent", "true");
      setVisible(false);
      // No reload for smoother UX
    }
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      background: "#18181b",
      color: "#fafafa",
      padding: "1rem 0.5rem",
      zIndex: 1000,
      textAlign: "center",
      boxShadow: "0 -2px 16px rgba(0,0,0,0.08)",
      fontFamily: 'Inter, sans-serif',
      fontSize: "1rem"
    }}>
      <span>
        We use cookies to enhance your experience and analyze site usage. By clicking <b>Accept</b>, you consent to our use of analytics cookies. See our <a href="/privacy" style={{ color: "#38bdf8", textDecoration: "underline" }}>Privacy Policy</a>.
      </span>
      <button
        onClick={acceptCookies}
        style={{
          marginLeft: 16,
          padding: "8px 20px",
          background: "#38bdf8",
          color: "#18181b",
          border: "none",
          borderRadius: 6,
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "1rem",
          boxShadow: "0 2px 8px rgba(56,189,248,0.08)"
        }}
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent; 