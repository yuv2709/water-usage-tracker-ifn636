import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex justify-center px-6 pt-16">
      <div className="w-full max-w-sm">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#005792] mb-2">
          Log In
        </h1>
        <p className="text-[#005792] text-xl mb-12">
          Welcome Back!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={function (e) {
              setFormData({ ...formData, email: e.target.value });
            }}
            className="w-full mb-6 p-4 rounded-xl border border-[#D9D9D9] bg-white text-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={function (e) {
              setFormData({ ...formData, password: e.target.value });
            }}
            className="w-full mb-10 p-4 rounded-xl border border-[#D9D9D9] bg-white text-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#005792] text-white py-4 rounded-full text-xl font-semibold shadow"
          >
            Login
          </button>
        </form>

        {/* Forgot password */}
        <p className="text-center text-lg mt-6 text-gray-700">
          Forgotten password?
        </p>

        {/* Register link */}
        <p className="text-center text-lg mt-8">
          Don’t have an account?{' '}
          <Link to="/register" className="text-[#005792] font-medium">
            Register →
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;