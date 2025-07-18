import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Inject Google Tag (gtag.js) if the environment variable is set
const googleTagId = import.meta.env.VITE_GOOGLE_TAG_ID;
if (googleTagId) {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${googleTagId}');
  `;
  document.head.appendChild(script2);
}

createRoot(document.getElementById("root")!).render(<App />);
