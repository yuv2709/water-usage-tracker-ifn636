import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
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
      <h2 className="text-2xl font-bold mb-4">My Devices</h2>

      <TaskForm
        devices={devices}
        setDevices={setDevices}
        editingDevice={editingDevice}
        setEditingDevice={setEditingDevice}
      />

      <TaskList
        devices={devices}
        setDevices={setDevices}
        setEditingDevice={setEditingDevice}
      />
    </div>
  );
};

export default Tasks;