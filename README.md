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

## Project Structure

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

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/yuv2709/water-usage-tracker-ifn636.git
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

## Running the Deployed Application

The application is deployed on an AWS EC2 instance.

### Accessing the Application

The application can be accessed using the EC2 public IP:
http://<public_ip_address>

### Important Note on IP Address

The EC2 instance uses a dynamic public IP address. This means:

- If the instance is **stopped and restarted**, the public IP may change.
- When the IP changes, the application URL will also change accordingly.

### How to Access After IP Change

If the application is not accessible:

1. Go to AWS Console → EC2 → Instances
2. Select the running instance
3. Copy the **new Public IPv4 address**
4. Use the updated URL: http://<new_public_ip_address>

### Backend Availability

The backend server is managed using **PM2**, which ensures:

- The backend automatically starts when the instance boots
- No manual intervention is required after restart

---

## Testing

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

## CI/CD Pipeline

A CI/CD pipeline is implemented using GitHub Actions.

Workflow includes:
Installing backend and frontend dependencies
Running backend unit tests
Building frontend application
Deploying updates to AWS EC2
Trigger:
Push to main branch
Pull requests

This ensures automated testing and deployment for every update.

## Deployment

The application is deployed on AWS EC2 using:

PM2 for backend process management
Nginx as a reverse proxy server
Public URL:
http://<public_ip_address>

## Test Credentials

Use the following credentials to access the application:

```bash
email: y@gmail.com
password:12345678
```

## System Design

Component-based architecture in React
Separation of frontend and backend
Simulated IoT data generation for water usage

## Version Control Strategy

main → production-ready code
Feature branches:
feature/dashboard
feature/device-ui
feature/profile-ui
feature/water-usage-backend
Pull Requests used for merging features into main

## Screenshots

Screenshots demonstrating:

CRUD operations
Dashboard functionality
CI/CD pipeline
Deployment status

(Provided in report submission)

## Author

Yuvraj Sachdeva 1
