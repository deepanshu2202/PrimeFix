# MERN Project

This is a **MERN stack application** consisting of three parts:  
- **Server** – Express.js + MongoDB backend with authentication and real-time socket connections.  
- **Admin** – React-based admin dashboard for managing data and users.  
- **Client** – React-based client-side application for end users.  

---

## 📂 Project Structure
```

.
├── admin/     # React Admin Dashboard
├── client/    # React Client Application
├── server/    # Express.js Server & API

````

---

## 🚀 Tech Stack
- **Frontend:** React, Redux Toolkit, React Router, React Icons, Socket.io Client, Axios  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.io, JWT, Bcrypt, Multer, Cloudinary  
- **Tools:** Vite, ESLint, Nodemon, dotenv  

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <project-folder>
````

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
npm start
```

or with nodemon:

```bash
npm run start
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

Create a `.env` file inside the **server** directory with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

For **Admin** and **Client**, create a `.env` file for Vite:

```env
VITE_API_URL=http://localhost:5000
```

---

## 📌 Features

* 🔒 JWT-based Authentication
* 📂 File Upload with Multer & Cloudinary
* ⚡ Real-time updates with Socket.io
* 🗄️ MongoDB database with Mongoose models
* 🎨 Modern UI with React + Redux Toolkit

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push and create a PR

Do you want me to now also prepare **separate lightweight README.md files** for `server`, `admin`, and `client` folders (with only their setup instructions), or just keep this single root-level README?
```
