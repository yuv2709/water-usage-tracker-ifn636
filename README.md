# AquaTrack – Water Usage Monitoring System

AquaTrack is a full-stack MERN application developed as part of IFN636 Assessment 1.2.  
The system allows users to monitor water usage across different devices, analyse consumption patterns, and manage their devices efficiently.

---

## 🚀 Features

### 🔐 Authentication

- User registration and login using JWT
- Secure authentication with protected routes

### 📟 Device Management (CRUD)

- Add new water monitoring devices
- View all registered devices
- Update device details
- Delete devices
- Automatic generation of water usage data per device

### 📊 Dashboard

- Displays:
  - Daily water usage
  - Monthly water usage
  - Total threshold
- Weekly usage visualization
- Filter by device location

### 🔔 Alerts

- Displays alerts based on usage and thresholds

### 👤 Profile

- View and update user information
- Logout functionality

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

### DevOps & Tools

- GitHub (Version Control)
- GitHub Actions (CI/CD)
- AWS EC2 (Deployment)
- PM2 (Process Manager)
- Nginx (Reverse Proxy)

---

## 📂 Project Structure

sampleapp_IFQ636/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ └── test/
│
├── frontend/
│ ├── src/
│ └── public/
│
└── .github/workflows/

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd sampleapp_IFQ636
```

### 2. Install Dependencies

```bash
npm run install-all
```

### 3. Configure Environment Variables

Create a .env file inside backend:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

### 4. Run Application Locally

```bash
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:5001

## 🧪 Testing

Backend testing is implemented using:

Mocha
Chai
Sinon

```bash
cd backend
npm test
```

Test cases cover:

Device creation logic
Error handling scenarios

## 🔄 CI/CD Pipeline

A CI/CD pipeline is implemented using GitHub Actions.

Workflow includes:
Installing backend and frontend dependencies
Running backend unit tests
Building frontend application
Deploying updates to AWS EC2
Trigger:
Push to main branch
Pull Requests

This ensures automated testing and deployment for every update.

## 🌐 Deployment

The application is deployed on AWS EC2 using:

PM2 for backend process management
Nginx as a reverse proxy server
🔗 Public URL:

## 🔐 Test Credentials

Use the following credentials to access the application:

## 🧠 System Design

RESTful API architecture
MVC pattern in backend
Component-based architecture in React
Separation of frontend and backend
Simulated IoT data generation for water usage

## 📌 Version Control Strategy

main → production-ready code
Feature branches:
feature/dashboard
feature/device-ui
feature/profile-ui
feature/water-usage-backend
Pull Requests used for merging features into main

## 📷 Screenshots

Screenshots demonstrating:

CRUD operations
Dashboard functionality
CI/CD pipeline
Deployment status

(Provided in report submission)

## 📚 References

https://nodejs.org/
https://react.dev/
https://www.mongodb.com/
https://docs.github.com/actions
https://aws.amazon.com/ec2/
https://pm2.keymetrics.io/

## 👨‍💻 Author

Yuvraj Sachdeva
