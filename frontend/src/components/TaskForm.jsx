import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const locations = ['Bathroom', 'Kitchen', 'Laundry', 'Toilet', 'Garden', 'Other'];

const TaskForm = ({ devices = [], setDevices, editingDevice, setEditingDevice }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
        deviceId: 'WUT-2377',
        deviceName: '',
        location: 'Bathroom',
        status: 'Connected',
        dailyThreshold: '150',
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

        if (setDevices) {
          setDevices(
            devices.map(function (device) {
              return device._id === response.data._id ? response.data : device;
            })
          );
        }
      } else {
        const response = await axiosInstance.post('/api/devices', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (setDevices) {
          setDevices([response.data, ...devices]);
        }
      }

      if (setEditingDevice) {
        setEditingDevice(null);
      }

      navigate('/devices');
    } catch (error) {
      alert('Failed to save device.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex justify-center px-4 py-6">
      <div className="w-full max-w-sm md:max-w-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-[#005792] mb-2">
            {editingDevice ? 'Update Device Information' : 'Set Up Device'}
          </h1>

          <p className="text-[#005792] text-lg mb-8">
            {editingDevice ? 'Update your device information' : 'Configure your new device'}
          </p>

          <div className="mb-8">
            <p className="text-2xl text-[#005792]">
              <span className="font-medium">Device ID:</span>{' '}
              <span className="text-gray-500">{formData.deviceId}</span>
            </p>
            <p className="text-gray-500 text-xl mt-1">
              Status: {formData.status}
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-medium text-[#005792]">Select Location</h2>
            <p className="text-gray-500 text-lg">Choose where the device is installed</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {locations.map(function (location) {
              const isSelected = formData.location === location;

              return (
                <button
                  key={location}
                  type="button"
                  onClick={function () {
                    setFormData({ ...formData, location: location });
                  }}
                  className={`h-24 rounded-2xl shadow-md border text-sm font-medium transition ${
                    isSelected
                      ? 'bg-[#8ED8F8] text-[#005792] border-[#7BCBEF]'
                      : 'bg-white text-[#005792] border-gray-200'
                  }`}
                >
                  {location}
                </button>
              );
            })}
          </div>

          <div className="mb-5">
            <label className="block text-2xl font-medium text-[#005792] mb-2">
              Device Name
            </label>
            <input
              type="text"
              placeholder="Bathroom Meter"
              value={formData.deviceName}
              onChange={function (e) {
                setFormData({ ...formData, deviceName: e.target.value });
              }}
              className="w-full p-4 rounded-xl border border-[#D9D9D9] bg-white text-xl"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-2xl font-medium text-[#005792] mb-2">
              Set Daily Threshold (optional)
            </label>
            <input
              type="number"
              placeholder="150"
              value={formData.dailyThreshold}
              onChange={function (e) {
                setFormData({ ...formData, dailyThreshold: e.target.value });
              }}
              className="w-full p-4 rounded-xl border border-[#D9D9D9] bg-white text-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#005792] text-white py-4 rounded-full text-2xl font-semibold shadow"
          >
            {editingDevice ? 'Update Device Information' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;