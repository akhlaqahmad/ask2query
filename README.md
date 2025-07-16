# Text2SQL.my / Ask2Query

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
[![OpenAI](https://img.shields.io/badge/openai-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

**Text2SQL.my** is an AI-powered web app that converts natural language into SQL queries. Built for Malaysian developers, analysts, and businesses, it supports English and Bahasa Malaysia, works entirely in your browser, and never uploads your data.

---

## 🚀 Features
- Convert plain English or Bahasa to SQL instantly
- Upload and query your own SQLite databases (processed locally)
- Demo mode with sample queries
- Query history and favorites (stored locally)
- Data visualization and export
- Social sharing for generated queries
- Privacy-first: your data never leaves your device
- Modern, responsive UI (dark/light mode)
- Powered by OpenAI GPT-4, Supabase, and Firebase

---

## 🛠️ Tech Stack
- [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/) (auth, edge functions)
- [Firebase](https://firebase.google.com/) (hosting, analytics)
- [OpenAI GPT-4](https://openai.com/)

---

## ⚡ Getting Started

### 1. **Clone the repository**
```sh
git clone https://github.com/akhlaqahmad/ask2query
cd ask2query
```

### 2. **Install dependencies**
```sh
npm install
```

### 3. **Set up environment variables**
Create a `.env` file in the project root:
```env
VITE_OPENAI_API_KEY=your-openai-key
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
```

### 4. **Run the app locally**
```sh
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deployment
- **Firebase Hosting**: Run `npm run build` then `firebase deploy`
- **Vercel/Netlify**: Connect your repo and set environment variables in the dashboard

---

## 📄 Legal & Privacy
- [Privacy Policy](/privacy)
- [Terms of Service](/terms)

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact
Questions, feedback, or partnership inquiries? Email us at [to@text2sql.my](mailto:to@text2sql.my)

---

© 2024 Text2SQL.my. All rights reserved.
