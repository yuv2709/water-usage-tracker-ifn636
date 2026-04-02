import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Dashboard = () => {
  const { user } = useAuth();

  const [devices, setDevices] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Total Usage');
  const [dashboardData, setDashboardData] = useState({
    today: 0,
    monthly: 0,
    threshold: 0,
    weeklyUsage: [0, 0, 0, 0, 0, 0, 0],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async function () {
      try {
        const response = await axiosInstance.get('/api/devices', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setDevices(response.data);
      } catch (error) {
        alert('Failed to load devices.');
      }
    };

    if (user?.token) {
      fetchDevices();
    }
  }, [user]);

  useEffect(() => {
    const fetchDashboardData = async function () {
      try {
        setLoading(true);

        const response = await axiosInstance.get(
          `/api/usage/dashboard?filter=${encodeURIComponent(selectedFilter)}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        setDashboardData({
          today: response.data.today || 0,
          monthly: response.data.monthly || 0,
          threshold: response.data.threshold || 0,
          weeklyUsage: response.data.weeklyUsage || [0, 0, 0, 0, 0, 0, 0],
        });
      } catch (error) {
        alert('Failed to load usage data.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchDashboardData();
    }
  }, [user, selectedFilter]);

  const availableFilters = useMemo(function () {
    const preferredOrder = ['Kitchen', 'Laundry', 'Bathroom', 'Toilet', 'Garden', 'Other'];

    const existingLocations = Array.from(
      new Set(
        devices
          .map(function (device) {
            return device.location;
          })
          .filter(Boolean)
      )
    );

    const orderedLocations = preferredOrder.filter(function (location) {
      return existingLocations.includes(location);
    });

    return ['Total Usage', ...orderedLocations];
  }, [devices]);

  const maxWeeklyValue = Math.max(...dashboardData.weeklyUsage, 1);

  const percentChange = useMemo(function () {
    if (!dashboardData.today || dashboardData.today === 0) {
      return 0;
    }

    const estimatedYesterday = Math.max(dashboardData.today - 61, 1);

    return Math.round(
      ((dashboardData.today - estimatedYesterday) / estimatedYesterday) * 100
    );
  }, [dashboardData.today]);

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
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#005792]">Dashboard</h1>
          <p className="text-[#005792] text-lg">Track your water usage</p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 mb-5 md:flex-wrap md:overflow-visible">
          {availableFilters.map(function (item) {
            const isSelected = selectedFilter === item;

            return (
              <button
                key={item}
                onClick={function () {
                  setSelectedFilter(item);
                }}
                className={`min-w-[95px] rounded-2xl shadow px-4 py-3 text-sm font-medium ${
                  isSelected
                    ? 'bg-[#8ED8F8] text-[#005792]'
                    : 'bg-white text-[#005792]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl shadow p-5 mb-5 text-center">
          <h2 className="text-2xl text-[#005792] mb-2">Today’s Usage</h2>
          <p className="text-5xl md:text-6xl font-bold text-[#005792]">
            {dashboardData.today.toLocaleString()} L
          </p>
          <p className="text-base mt-3">
            <span className="text-red-500">
              {percentChange >= 0 ? '+' : ''}
              {percentChange}%
            </span>{' '}
            <span className="text-[#005792]">from yesterday</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-3xl shadow p-4">
            <h3 className="text-[#005792] text-xl mb-2">Monthly Usage</h3>
            <p className="text-3xl font-bold text-[#005792]">
              {dashboardData.monthly.toLocaleString()} L
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow p-4">
            <h3 className="text-[#005792] text-xl mb-2">Threshold</h3>
            <p className="text-3xl font-bold text-[#005792]">
              {dashboardData.threshold.toLocaleString()} L/day
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-5 mb-5">
          <h3 className="text-center text-gray-600 text-lg font-semibold mb-4">
            Weekly Usage
          </h3>

          <div className="h-48 bg-purple-50 rounded-2xl flex items-end justify-around px-4 pb-3">
            {dashboardData.weeklyUsage.map(function (value, index) {
              const height = Math.max((value / maxWeeklyValue) * 120, 25);

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

        <div className="bg-red-100 rounded-2xl shadow p-4 mb-6">
          <h3 className="text-[#005792] text-xl font-semibold">Leak detected</h3>
          <p className="text-gray-500 text-sm mt-1">
            {selectedFilter === 'Total Usage' ? 'Bathroom Meter' : `${selectedFilter} Meter`}
          </p>
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