# 🎓 Department-Pre Approved Student Portal

A secure, full-stack student portal built for institute-approved users only — streamlining academic access, events, and communication.

🚀 **Live Demo**: [https://bcatechteam.onrender.com](https://bcatechteam.onrender.com)

---

## 🔐 Key Features

- 🔒 **Restricted Registration**: Only pre-approved students with institute-provided IDs can register.
- 🛡️ **Secure Authentication**: Passport.js (Local Strategy) with sessions stored via connect-mongo.
- 📚 **Learning Resource Access**: Centralized space for academic materials.
- 📅 **Event Calendar & Exam Dates**: Admin-managed dashboard for updates.
- 📢 **Live Notices & Announcements**: Always stay informed.
- 📬 **Integrated Contact Form**: Send messages directly via Nodemailer.

---

## 🛠️ Tech Stack

| Layer         | Technology                          |
|--------------|--------------------------------------|
| Backend       | Node.js, Express.js                 |
| Database      | MongoDB, Mongoose                   |
| Authentication| Passport.js, Session, connect-mongo |
| Templating    | EJS + ejs-mate                      |
| Email         | Nodemailer                          |
| Env Handling  | Dotenv                              |
| Flash Alerts  | connect-flash                       |
| Routing       | Modular (Students, Admin, Events...)|

---

## 🧠 Learning Outcomes

- Built real-world authentication and session flows
- Modular backend architecture using Express routing
- Deployed and tested with realistic constraints

---

## ⚙️ Admin Panel

Admins can:

- Approve student registrations
- Add/update upcoming events and important exam dates
- Manage notice board entries

---
## 📂 Folder Structure

├── models/
├── routes/
│ ├── students.js
│ ├── admin.js
│ ├── events.js
│ ├── dates.js
│ └── contact.js
├── views/
├── public/
├── app.js
├── .env
├── package.json


## 🌐 Deployment

Deployed on: **Render**  
Link: [https://bcatechteam.onrender.com](https://bcatechteam.onrender.com)
