import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';

const EditDevice = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [device, setDevice] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async function () {
      try {
        const response = await axiosInstance.get('/api/devices', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setDevices(response.data);

        const foundDevice = response.data.find(function (item) {
          return item._id === id;
        });

        setDevice(foundDevice || null);
      } catch (error) {
        alert('Failed to fetch device details.');
      }
    };

    fetchDevices();
  }, [id, user]);

  if (!device) {
    return <div className="container mx-auto p-6">Loading device...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <TaskForm
        devices={devices}
        setDevices={setDevices}
        editingDevice={device}
        setEditingDevice={setDevice}
      />
    </div>
  );
};

export default EditDevice;