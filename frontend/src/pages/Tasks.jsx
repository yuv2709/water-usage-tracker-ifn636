import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [devices, setDevices] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axiosInstance.get('/api/devices', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setDevices(response.data);
      } catch (error) {
        alert('Failed to fetch devices.');
      }
    };

    fetchDevices();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-2">My Devices</h2>
      <p className="text-gray-600 mb-6">Manage your connected devices</p>

      <TaskList
        devices={devices}
        setDevices={setDevices}
        setEditingDevice={setEditingDevice}
      />

      <Link
        to="/devices/new"
        className="block text-center mt-6 bg-blue-700 text-white px-6 py-3 rounded-full font-semibold"
      >
        Add New Device
      </Link>
    </div>
  );
};

export default Tasks;