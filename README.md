# Text2SQL.my / Ask2Query

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
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
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
