import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskList = ({ devices, setDevices }) => {
  const { user } = useAuth();

  const handleDelete = async function (deviceId) {
    try {
      await axiosInstance.delete(`/api/devices/${deviceId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setDevices(
        devices.filter(function (device) {
          return device._id !== deviceId;
        })
      );
    } catch (error) {
      alert('Failed to delete device.');
    }
  };

  return (
    <div>
      {devices.length === 0 ? (
        <p className="text-gray-600">No devices added yet.</p>
      ) : (
        devices.map(function (device) {
          return (
            <div key={device._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
              <h2 className="font-bold text-lg">{device.deviceName}</h2>
              <p><strong>Device ID:</strong> {device.deviceId}</p>
              <p><strong>Location:</strong> {device.location}</p>
              <p><strong>Status:</strong> {device.status}</p>
              <p><strong>Daily Threshold:</strong> {device.dailyThreshold} L/day</p>

              <div className="mt-2">
                <Link
                  to={`/devices/edit/${device._id}`}
                  className="inline-block mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Update
                </Link>

                <button
                  onClick={function () {
                    handleDelete(device._id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TaskList;