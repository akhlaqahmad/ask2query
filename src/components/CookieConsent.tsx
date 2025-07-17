import React, { useState } from "react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(
    typeof window !== "undefined" && window.analyticsConsent !== true
  );

  const acceptCookies = () => {
    if (typeof window !== "undefined") {
      window.analyticsConsent = true;
      localStorage.setItem("analyticsConsent", "true");
      setVisible(false);
      window.location.reload(); // Reload to re-init analytics
    }
  };

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", bottom: 0, width: "100%", background: "#222", color: "#fff", padding: 16, zIndex: 1000, textAlign: "center" }}>
      This site uses cookies for analytics. <button onClick={acceptCookies} style={{ marginLeft: 8, padding: "4px 12px", background: "#fff", color: "#222", border: "none", borderRadius: 4 }}>Accept</button>
    </div>
  );
};

export default CookieConsent; 