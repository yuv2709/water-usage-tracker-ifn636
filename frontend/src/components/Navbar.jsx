import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = function () {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#005792] text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to={user ? '/dashboard' : '/login'} className="text-2xl font-bold">
        AquaTrack
      </Link>

      {/* Desktop Navigation */}
      {user ? (
        <div className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/devices" className="hover:underline">
            Devices
          </Link>
          <Link to="/alerts" className="hover:underline">
            Alerts
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">Login</Link>
          <Link
            to="/register"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;