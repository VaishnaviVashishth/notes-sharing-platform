# 📘 Notes Sharing Platform

A full-stack **Notes Sharing Web Application** where students can register, upload PDF notes, and download study materials uploaded by others.  
The platform also includes an **Admin Panel** to manage users and notes.

---

## 🚀 Features

### 👤 User Features
- Register & Login system  
- Upload study notes (PDF only)  
- Browse notes by subject  
- Search notes  
- Download PDFs  
- Like notes  

### 🛠 Admin Features
- Admin login with secure credentials  
- View all users  
- View all uploaded notes  
- Delete any note  
- Admin-only dashboard  

### 🎨 UI Features
- Modern responsive UI  
- Navbar & Footer  
- Study tips section  
- Hover animations  
- Clean card-based layout  

---

## 🧰 Tech Stack

**Frontend**
- HTML  
- CSS  
- JavaScript  

**Backend**
- Node.js  
- Express.js  

**Database**
- MongoDB Atlas  

**Tools**
- Git & GitHub  
- Multer (file uploads)  

---

## 📂 Project Structure
notes-sharing-platform/
│
├── backend/
│ ├── routes/
│ ├── uploads/
│ ├── User.js
│ ├── Note.js
│ └── server.js
│
├── frontend/
│ ├── login.html
│ ├── register.html
│ ├── notes.html
│ ├── upload.html
│ ├── admin.html
│ ├── admin-dashboard.html
│ ├── style.css
│ └── script.js

---

## ⚙️ How to Run Locally

### 1️⃣ Download the Project
- Download the project ZIP file  
- Extract it on your system  

### 2️⃣ Install Backend Dependencies

Open terminal in the `backend` folder:

```bash```
npm install

---

###3️⃣ Add Environment Variables
Create a .env file inside the backend folder and add:
MONGO_URI=your_mongodb_connection_string
ADMIN_EMAIL=your_admin_email
ADMIN_PASS=your_admin_password

---

###4️⃣ Start the Server
node server.js

---

###5️⃣ Open the Frontend
Open this file in your browser:
frontend/login.html

Now the application is running locally on your system.
