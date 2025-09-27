
---

# PrimeFix – MERN Service Booking Platform

PrimeFix is a **MERN stack application** for booking home services.
Users can book services (plumbing, electrical, cleaning, shifting, etc.) through the client app, while admins manage requests, assign workers, and update service charges from the admin dashboard.

---

## 📂 Project Structure

```
.
├── admin/     # React Admin Dashboard (manage bookings, users, workers)
├── client/    # React Client App (service booking platform)
├── server/    # Express.js Server & API
```

---

## 🚀 Tech Stack

* **Frontend:** React, Redux Toolkit, React Router, React Icons, Socket.io Client, Axios
* **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.io, JWT, Bcrypt, Multer, Cloudinary
* **Tools:** Vite, ESLint, Nodemon, dotenv

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/deepanshu2202/PrimeFix.git
cd PrimeFix
```

### 2. Install Dependencies

#### Server

```bash
cd server
npm install
```

#### Admin

```bash
cd ../admin
npm install
```

#### Client

```bash
cd ../client
npm install
```

---

## ▶️ Running the Project

### Start Server

```bash
cd server
npm run run
```

or with nodemon:

```bash
npm start
```

### Start Admin (Dev Mode)

```bash
cd admin
npm run dev
```

### Start Client (Dev Mode)

```bash
cd client
npm run dev
```

---

## 📦 Available Scripts

### Admin / Client

* `npm run dev` → Start Vite dev server
* `npm run build` → Build for production
* `npm run preview` → Preview production build
* `npm run lint` → Run ESLint checks

### Server

* `npm run start` → Start server with Nodemon
* `npm run run` → Run server with Node

---

## 🔑 Environment Variables

### Server `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### Client / Admin `.env`

```env
VITE_API_URL=http://localhost:5000
```

---

## 📌 Features

* 🛠️ Book home services from client app
* 🧑‍💼 Admin dashboard to manage bookings & customers
* 🔒 JWT-based Authentication & Authorization
* 📂 File Uploads with Multer & Cloudinary
* ⚡ Real-time updates with Socket.io
* 🗄️ MongoDB database with Mongoose models
* 🎨 Modern UI with React + Redux Toolkit

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push and create a PR

---