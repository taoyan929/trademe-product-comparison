# Trade Me Product Comparison Page (Forked Project)
*A redesigned comparison experience focused on improving Trade Me’s product browsing UX.*

---

## 📝 Overview

This repository is **my fork** of a collaborative Mission Ready Level 5 project.  
The original project was developed by a cross-functional team of developers and UX designers during Mission Ready training.

👉 **This fork focuses on the features that I personally implemented**, especially the Product Comparison experience.  
Other features developed by teammates are retained **with permission** and clearly attributed below.

---

# 👨‍💻 My Contribution (Tao Yan)

## 🎨 Frontend Development
- Built the entire **Comparison Page UI** (desktop grid + mobile modal)
- Developed reusable `ComparisonItem` and filter components  
- Implemented **location / price / mileage filters**
- Implemented **sorting** (highest / lowest price)
- Added **URLSearchParams** support (deep-linking & page refresh persistence)
- Designed **responsive layout** (SCSS / CSS Modules)
- Collaborated closely with UX designers to match Figma wireframes
- Added error states, loading states, and polished interaction behaviour

## 🛠 Backend Development
- Created backend **Express API endpoints** for listing retrieval  
- Added backend-side filtering & sorting helpers  
- Designed **MongoDB schema** for listings (title, price, location, photos, metadata)  
- Implemented error-safe responses for invalid queries  

---

# 🤝 Team Contribution (With Attribution)

The following components were implemented by teammates during the original Mission Ready team project and are retained in this fork with their permission.

### 👩‍💻 **Lona**
- Backend architecture and core server setup  
- Additional API routes and controllers  
- Data handling and integration support  

### 👩‍💻 **Sana**
- UX research insights and interaction design input  
- UI flow refinement and usability feedback  
- Contribution to shared frontend components  

These parts are included for project completeness and context, but **are not part of my personal contribution**.

---

# ✨ Features (This Fork Focus)

- ✔ Product comparison cards (desktop + mobile)
- ✔ Filter panel & mobile modal
- ✔ Price / location / mileage filtering
- ✔ Sorting behaviour
- ✔ URL search param syncing
- ✔ Responsive UI
- ✔ MongoDB listing schema
- ✔ Listing API endpoints (Express)

---

# 🧱 Tech Stack

## Frontend
- React  
- Vite  
- SCSS / CSS Modules  
- URLSearchParams  
- Fetch API  
- Responsive Design  

## Backend
- Node.js  
- Express  
- MongoDB + Mongoose  
- dotenv  
- Nodemon  

---

# 📁 Project Structure

```text
client/
├── src/
│   ├── components/
│   │   ├── ComparisonItem.jsx
│   │   ├── DesktopFilterPanel.jsx
│   │   └── MobileFilterModal.jsx
│   ├── pages/
│   │   └── ComparisonPage.jsx
│   ├── api/
│   │   └── listings.js
│   └── App.jsx
│
server/
├── models/
│   └── Listing.js
├── routes/
│   └── listings.js
├── utils/
│   └── filtering.js
└── index.js
```

---

# ▶️ How to Run

## Backend
```bash
cd server
npm install
npm run dev
```

Runs on:
```text
http://localhost:3000
```

## Frontend
```bash
cd client
npm install
npm run dev
```

Runs on:
```text
http://localhost:5173
```

---

# 📚 Background

New Trade Me users often struggle with information overload on product pages and difficulty comparing multiple listings side by side.  
This project focuses on improving the **comparison experience**, helping users make clearer and faster decisions.

---

# 🏷️ Attribution

- Original team repository:  
  https://github.com/Lona44/Mission-Ready-L5-Mission-5-Phase-2  

- Team members:  
  - Tao Yan – Comparison Page, frontend logic, backend listings & MongoDB  
  - Lona – Backend foundation and API support  
  - Sana – UX research and interaction design  

---

# 🎉 End

This fork showcases my work on the Trade Me product comparison experience and is part of my full-stack / frontend developer portfolio.
