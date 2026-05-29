# 🌾 Karam Rice - Official Web Application

A modern, full-stack web application built with the MERN stack for Karam Rice — a premium rice brand. This platform showcases products, company news, and provides a seamless user experience with multilingual support.

---

## ✨ Features

- 🛍️ Product catalog with detailed product pages
- 📰 News & blog section
- ⭐ Customer reviews & comments
- 📬 Contact form
- 📄 E-Catalog (PDF viewer)
- 🔐 Admin dashboard for content management
- 🔑 JWT-based authentication
- 🌍 Multilingual support (English & Urdu)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT |
| Internationalization | i18n |

---

## 📁 Project Structure

```
karam_rice/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── context/
        └── locales/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/karam_rice.git
cd karam_rice
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Create `.env` file in backend folder**
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. **Frontend Setup**
```bash
cd frontend
npm install
```

5. **Run the app**
```bash
# Backend
cd backend
npm start

# Frontend (new terminal)
cd frontend
npm run dev
```

---

## 🌐 Pages

- **Home** - Hero section, products preview, stats, testimonials
- **About** - Company info, CEO & director messages, team
- **Products** - Sella 1121, Golden Sella, Steam Rice
- **News** - Latest news & blogs
- **Contact** - Contact form
- **E-Catalog** - Downloadable product catalog
- **Store** - Online store section
- **Admin** - Protected dashboard for content management

---

## 📝 Environment Variables

Create a `.env` file in the `backend` folder:

```
MONGODB_URI=
JWT_SECRET=
PORT=
```

---

## 👩‍💻 Developed By Aliha Asif

Built with ❤️ using the MERN Stack
