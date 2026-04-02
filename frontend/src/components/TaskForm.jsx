import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ devices, setDevices, editingDevice, setEditingDevice }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    deviceId: '',
    deviceName: '',
    location: 'Bathroom',
    status: 'Connected',
    dailyThreshold: '',
  });

  useEffect(() => {
    if (editingDevice) {
      setFormData({
        deviceId: editingDevice.deviceId || '',
        deviceName: editingDevice.deviceName || '',
        location: editingDevice.location || 'Bathroom',
        status: editingDevice.status || 'Connected',
        dailyThreshold: editingDevice.dailyThreshold || '',
      });
    } else {
      setFormData({
        deviceId: '',
        deviceName: '',
        location: 'Bathroom',
        status: 'Connected',
        dailyThreshold: '',
      });
    }
  }, [editingDevice]);

  const handleSubmit = async function (e) {
    e.preventDefault();

    try {
      if (editingDevice) {
        const response = await axiosInstance.put(
          `/api/devices/${editingDevice._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        setDevices(
          devices.map(function (device) {
            return device._id === response.data._id ? response.data : device;
          })
        );
      } else {
        const response = await axiosInstance.post('/api/devices', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setDevices([response.data, ...devices]);
      }

      setEditingDevice(null);
      setFormData({
        deviceId: '',
        deviceName: '',
        location: 'Bathroom',
        status: 'Connected',
        dailyThreshold: '',
      });
    } catch (error) {
      alert('Failed to save device.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingDevice ? 'Update Device' : 'Set Up Device'}
      </h1>

      <input
        type="text"
        placeholder="Device ID"
        value={formData.deviceId}
        onChange={function (e) {
          setFormData({ ...formData, deviceId: e.target.value });
        }}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Device Name"
        value={formData.deviceName}
        onChange={function (e) {
          setFormData({ ...formData, deviceName: e.target.value });
        }}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <select
        value={formData.location}
        onChange={function (e) {
          setFormData({ ...formData, location: e.target.value });
        }}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="Bathroom">Bathroom</option>
        <option value="Kitchen">Kitchen</option>
        <option value="Laundry">Laundry</option>
        <option value="Toilet">Toilet</option>
        <option value="Garden">Garden</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={formData.status}
        onChange={function (e) {
          setFormData({ ...formData, status: e.target.value });
        }}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="Connected">Connected</option>
        <option value="Disconnected">Disconnected</option>
      </select>

      <input
        type="number"
        placeholder="Daily Threshold (Litres)"
        value={formData.dailyThreshold}
        onChange={function (e) {
          setFormData({ ...formData, dailyThreshold: e.target.value });
        }}
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingDevice ? 'Update Device' : 'Add Device'}
      </button>
    </form>
  );
};

export default TaskForm;