import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Dashboard = () => {
  const { user } = useAuth();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async function () {
      try {
        const response = await axiosInstance.get('/api/devices', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setDevices(response.data);
      } catch (error) {
        alert('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchDevices();
    }
  }, [user]);

  const stats = useMemo(function () {
    const totalDevices = devices.length;
    const connectedDevices = devices.filter(function (device) {
      return device.status === 'Connected';
    }).length;

    const disconnectedDevices = totalDevices - connectedDevices;

    const totalThreshold = devices.reduce(function (sum, device) {
      return sum + Number(device.dailyThreshold || 0);
    }, 0);

    const averageThreshold =
      totalDevices > 0 ? Math.round(totalThreshold / totalDevices) : 0;

    const devicesByLocation = {};
    devices.forEach(function (device) {
      const location = device.location || 'Other';
      devicesByLocation[location] = (devicesByLocation[location] || 0) + 1;
    });

    const locationEntries = Object.entries(devicesByLocation).sort(function (a, b) {
      return b[1] - a[1];
    });

    const topLocation = locationEntries.length > 0 ? locationEntries[0][0] : 'N/A';

    const warningDevices = devices.filter(function (device) {
      return Number(device.dailyThreshold || 0) > 200;
    }).length;

    return {
      totalDevices,
      connectedDevices,
      disconnectedDevices,
      totalThreshold,
      averageThreshold,
      topLocation,
      warningDevices,
    };
  }, [devices]);

  const weeklyBars = useMemo(function () {
    const base = devices.length || 1;
    return [
      40 + base * 4,
      55 + base * 3,
      48 + base * 5,
      62 + base * 4,
      44 + base * 6,
      58 + base * 3,
      50 + base * 5,
    ];
  }, [devices]);

  const recentDevices = useMemo(function () {
    return [...devices].slice(0, 3);
  }, [devices]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] px-4 py-6 flex justify-center">
        <div className="w-full max-w-sm md:max-w-3xl lg:max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold text-[#005792]">Dashboard</h1>
          <p className="text-gray-600 mt-2">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-6 flex justify-center">
      <div className="w-full max-w-sm md:max-w-3xl lg:max-w-5xl pb-24 md:pb-6">
        <div className="mb-5">
          <h1 className="text-3xl md:text-4xl font-bold text-[#005792]">Dashboard</h1>
          <p className="text-gray-600">Monitor your connected water tracking devices</p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 mb-5 md:flex-wrap md:overflow-visible">
          <button className="min-w-[110px] bg-[#8ED8F8] text-[#005792] rounded-2xl shadow px-4 py-3 text-sm font-medium">
            All Devices
          </button>
          <button className="min-w-[110px] bg-white text-[#005792] rounded-2xl shadow px-4 py-3 text-sm font-medium">
            Connected
          </button>
          <button className="min-w-[110px] bg-white text-[#005792] rounded-2xl shadow px-4 py-3 text-sm font-medium">
            Warnings
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow p-5 mb-5 text-center">
          <h2 className="text-lg text-gray-600 mb-2">Connected Devices</h2>
          <p className="text-4xl md:text-5xl font-bold text-[#005792]">
            {stats.connectedDevices}
          </p>
          <p className="text-sm mt-2 text-gray-600">
            out of {stats.totalDevices} registered devices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-3xl shadow p-4">
            <h3 className="text-gray-600 mb-2">Average Threshold</h3>
            <p className="text-3xl font-bold text-[#005792]">
              {stats.averageThreshold} L/day
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow p-4">
            <h3 className="text-gray-600 mb-2">Most Used Location Type</h3>
            <p className="text-3xl font-bold text-[#005792]">{stats.topLocation}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-5 mb-5">
          <h3 className="text-center text-gray-600 mb-4">Weekly Device Activity</h3>

          <div className="h-44 bg-purple-100 rounded-2xl flex items-end justify-around px-4 pb-3">
            {weeklyBars.map(function (height, index) {
              return (
                <div
                  key={index}
                  className="w-5 bg-purple-400 rounded-t"
                  style={{ height: `${height}px` }}
                />
              );
            })}
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-3xl shadow p-5">
            <h3 className="text-[#005792] text-xl font-semibold mb-3">Recent Devices</h3>

            {recentDevices.length === 0 ? (
              <p className="text-gray-500">No devices added yet.</p>
            ) : (
              <div className="space-y-3">
                {recentDevices.map(function (device) {
                  return (
                    <div
                      key={device._id}
                      className="flex items-center justify-between border-b pb-2 last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-[#005792]">{device.deviceName}</p>
                        <p className="text-sm text-gray-500">{device.location}</p>
                      </div>
                      <span
                        className={`text-sm ${
                          device.status === 'Connected'
                            ? 'text-green-600'
                            : 'text-red-500'
                        }`}
                      >
                        {device.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div
            className={`rounded-3xl shadow p-5 ${
              stats.warningDevices > 0 ? 'bg-red-100' : 'bg-green-100'
            }`}
          >
            <h3 className="text-[#005792] text-xl font-semibold mb-2">
              {stats.warningDevices > 0 ? 'Threshold Warning' : 'System Healthy'}
            </h3>
            <p className="text-gray-700">
              {stats.warningDevices > 0
                ? `${stats.warningDevices} device(s) have a daily threshold above 200 L/day.`
                : 'All current devices are within a normal threshold range.'}
            </p>
          </div>
        </div>

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

export default Dashboard;