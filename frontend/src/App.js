import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Devices from './pages/Tasks';
import AddDevice from './pages/AddDevice';
import EditDevice from './pages/EditDevice';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices/new" element={<AddDevice />} />
        <Route path="/devices/edit/:id" element={<EditDevice />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </Router>
  );
}

export default App;