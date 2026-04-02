import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 flex justify-center">
      <div className="w-full max-w-sm md:max-w-3xl lg:max-w-5xl">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Dashboard</h1>
          <p className="text-gray-600">Track your water usage</p>
        </div>

        {/* Device Selector */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-5 md:flex-wrap md:overflow-visible">
          {["Total", "Kitchen", "Laundry", "Bathroom"].map((item) => (
            <button
              key={item}
              className="min-w-[90px] bg-white rounded-xl shadow px-4 py-2 text-sm"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Today's Usage */}
        <div className="bg-white rounded-xl shadow p-5 mb-5 text-center">
          <h2 className="text-lg text-gray-600 mb-2">Today’s Usage</h2>
          <p className="text-4xl md:text-5xl font-bold text-blue-700">621 L</p>
          <p className="text-sm mt-2">
            <span className="text-red-500">+11%</span> from yesterday
          </p>
        </div>

        {/* Monthly + Threshold */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-gray-600">Monthly Usage</h3>
            <p className="text-2xl font-bold text-blue-700">2,430 L</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-gray-600">Threshold</h3>
            <p className="text-2xl font-bold text-blue-700">520 L/day</p>
          </div>
        </div>

        {/* Weekly Usage Placeholder */}
        <div className="bg-white rounded-xl shadow p-5 mb-5">
          <h3 className="text-center text-gray-600 mb-4">Weekly Usage</h3>

          {/* Placeholder graph */}
          <div className="h-40 bg-purple-100 rounded-lg flex items-end justify-around px-4 pb-3">
            {[12, 16, 10, 20, 14, 18, 15].map((h, i) => (
              <div key={i} className="w-4 bg-purple-400 rounded-t" style={{ height: `${h * 5}px` }} />
            ))}
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

        {/* Alert Card */}
        <div className="bg-red-100 rounded-xl shadow p-4 mb-6">
          <h3 className="font-semibold text-red-600">Leak detected</h3>
          <p className="text-sm text-gray-600">Bathroom Meter</p>
        </div>

        {/* Bottom Navigation (mobile only) */}
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