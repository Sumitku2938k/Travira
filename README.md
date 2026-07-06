# 🌍 Travira

> **Smart Tourist Safety Monitoring & Incident Response System**

Travira is an AI-powered tourist safety platform designed to improve traveler security through real-time monitoring, emergency response, and intelligent risk analysis. The platform helps authorities monitor tourists, detect emergencies, identify risky zones, and respond quickly to incidents from a centralized dashboard.

This project was developed as a team project using **Next.js**, **TypeScript**, **React**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB**.

---

# 🚀 Features

## 👤 Tourist Management

* Tourist registration and profile management
* Track tourist information
* View tourist details
* Search and filter tourists

## 🚨 Emergency Alert System

* Real-time emergency alerts
* SOS notification handling
* Alert severity classification
* Active incident tracking

## 🗺️ Interactive Dashboard

* Live dashboard overview
* Tourist statistics
* Active alerts panel
* Safety analytics
* Quick monitoring interface

## 📍 Location Monitoring

* Tourist location tracking
* Risk zone monitoring
* Geographical visualization
* Trip monitoring

## 📊 Reports & Analytics

* Safety reports
* Incident statistics
* Tourist activity overview
* Monitoring insights

## 🔒 Authentication

* Secure login system
* Protected routes
* User session management

---

# 🛠 Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Development Tools

* Git
* GitHub
* npm

---

# 📂 Project Structure

```
## 📂 Project Structure


Travira/
├── client/                      # Frontend application
│   ├── components/              # Reusable UI components
│   │   ├── layout/              # Application layout
│   │   ├── map/                 # Interactive map components
│   │   └── ui/                  # Reusable UI components (buttons, cards, tables, etc.)
│   │
│   ├── context/                 # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── LanguageContext.tsx
│   │
│   ├── data/                    # Mock/Demo data
│   │   ├── alerts.ts
│   │   ├── riskyZones.ts
│   │   └── tourists.ts
│   │
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   ├── pages/                   # Application pages
│   │   ├── Dashboard.tsx
│   │   ├── Tourists.tsx
│   │   ├── TouristDetail.tsx
│   │   ├── Alerts.tsx
│   │   ├── Reports.tsx
│   │   ├── RiskyZones.tsx
│   │   ├── Login.tsx
│   │   └── NotFound.tsx
│   │
│   ├── App.tsx                  # Root application component
│   └── global.css               # Global styles
│
├── server/                      # Backend server
│   ├── index.ts
│   ├── node-build.ts
│   └── routes/
│       └── demo.ts
│
├── shared/                      # Shared API types & utilities
│   └── api.ts
│
├── public/                      # Static assets
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
│
├── netlify/                     # Netlify serverless functions
│   └── functions/
│       └── api.ts
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Go into the project directory

```bash
cd Travira
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

# 📌 Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> Add any additional environment variables required for your local setup.

---

# 📷 Main Modules

* Dashboard
* Tourist Management
* Active Alerts
* Reports
* Risky Zones
* Authentication
* Trip Monitoring

---

# 🎯 Project Objective

Travira aims to improve tourist safety by providing authorities with a centralized platform for monitoring tourist activities, responding to emergencies, and analyzing safety-related data. The system focuses on faster incident response, better visibility, and improved traveler security.

---

# 👨‍💻 Team Project

This project was built collaboratively as a team project. Development included frontend implementation, backend APIs, database integration, dashboard development, authentication, and tourist management features.

---

# 🔮 Future Improvements

* Live GPS tracking
* AI-based risk prediction
* Push notifications
* Offline emergency mode
* Multi-language support
* Heatmap visualization
* Role-based access control
* Real-time updates using WebSockets
* Cloud deployment

---

# 📄 License

This project is developed for educational and demonstration purposes.
