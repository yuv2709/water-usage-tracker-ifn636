import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      await axiosInstance.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex justify-center px-6 pt-16">
      <div className="w-full max-w-sm">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#005792] mb-2">
          Create Account
        </h1>
        <p className="text-[#005792] text-xl mb-12">
          Create your new account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={function (e) {
              setFormData({ ...formData, name: e.target.value });
            }}
            className="w-full mb-6 p-4 rounded-xl border border-[#D9D9D9] bg-white text-lg"
            required
          />

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
            className="w-full mb-6 p-4 rounded-xl border border-[#D9D9D9] bg-white text-lg"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={function (e) {
              setFormData({ ...formData, confirmPassword: e.target.value });
            }}
            className="w-full mb-10 p-4 rounded-xl border border-[#D9D9D9] bg-white text-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#005792] text-white py-4 rounded-full text-xl font-semibold shadow"
          >
            Create Account
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-lg mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-[#005792] font-medium">
            Log In →
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;