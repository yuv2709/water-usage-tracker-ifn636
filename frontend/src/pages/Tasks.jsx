import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const Devices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async function () {
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

  const handleDelete = async function (id) {
    try {
      await axiosInstance.delete(`/api/devices/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setDevices(devices.filter(function (device) {
        return device._id !== id;
      }));
    } catch (error) {
      alert('Failed to delete device.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-6 flex justify-center">
      <div className="w-full max-w-sm md:max-w-3xl lg:max-w-4xl pb-24">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#005792]">My Devices</h1>
          <p className="text-gray-600">Manage your connected devices</p>
        </div>

        {/* Device List */}
        <div className="space-y-4">
          {devices.map(function (device) {
            const isConnected = device.status === 'Connected';

            return (
              <div
                key={device._id}
                className="bg-white rounded-2xl shadow-md px-4 py-4 flex justify-between items-center"
              >
                {/* Left */}
                <div>
                  <h2 className="text-lg font-semibold text-[#005792]">
                    {device.deviceName}
                  </h2>

                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isConnected ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>

                    <p className="text-sm text-gray-500">
                      Status:{' '}
                      <span
                        className={
                          isConnected ? 'text-green-600' : 'text-red-600'
                        }
                      >
                        {device.status}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/devices/edit/${device._id}`)}
                    className="px-3 py-1 text-sm bg-gray-200 rounded-lg"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(device._id)}
                    className="text-red-500 text-xl"
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Device Button */}
        <button
          onClick={() => navigate('/devices/new')}
          className="w-full mt-6 bg-[#005792] text-white py-4 rounded-full text-lg font-semibold shadow flex justify-center items-center gap-2"
        >
          ➕ Add New Device
        </button>

        {/* Bottom Nav */}
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

export default Devices;