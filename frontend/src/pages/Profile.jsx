import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async function () {
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          university: response.data.university || '',
          address: response.data.address || '',
        });
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async function (e) {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const updatedUser = {
        ...user,
        name: response.data.name || formData.name,
        email: response.data.email || formData.email,
      };

      login(updatedUser);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = function () {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = function () {
    alert('Delete account functionality is not connected yet.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] px-4 py-6 flex justify-center">
        <div className="w-full max-w-sm md:max-w-3xl lg:max-w-4xl">
          <h1 className="text-3xl font-bold text-[#005792]">Profile</h1>
          <p className="text-gray-600 mt-2">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-6 flex justify-center">
      <div className="w-full max-w-sm md:max-w-3xl lg:max-w-4xl pb-24 md:pb-6">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#005792]">Profile</h1>

            {!editing ? (
              <button
                type="button"
                onClick={function () {
                  setEditing(true);
                }}
                className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-[#005792]"
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#005792] text-white"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-2xl text-[#005792] mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              disabled={!editing}
              onChange={function (e) {
                setFormData({ ...formData, name: e.target.value });
              }}
              className="w-full p-4 rounded-xl border border-[#D9D9D9] bg-white text-xl text-[#005792] disabled:bg-white"
            />
          </div>

          <div className="mb-12">
            <label className="block text-2xl text-[#005792] mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              disabled={!editing}
              onChange={function (e) {
                setFormData({ ...formData, email: e.target.value });
              }}
              className="w-full p-4 rounded-xl border border-[#D9D9D9] bg-white text-xl text-[#005792] disabled:bg-white"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#005792] mb-4">Actions</h2>

            <div className="space-y-4">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-white rounded-2xl shadow-md px-5 py-5 text-left border border-gray-200"
              >
                <span className="text-[#005792] text-2xl font-medium">Log Out</span>
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="w-full bg-white rounded-2xl shadow-md px-5 py-5 text-left border border-gray-200"
              >
                <span className="text-red-600 text-2xl font-medium">Delete Account</span>
              </button>
            </div>
          </div>
        </form>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden flex justify-around py-3">
          <Link to="/dashboard">🏠</Link>
          <Link to="/devices">📟</Link>
          <Link to="/alerts">🔔</Link>
          <Link to="/profile">👤</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;