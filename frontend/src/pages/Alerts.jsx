import { Link } from 'react-router-dom';

const Alerts = () => {
  const todayAlerts = [
    {
      id: 1,
      title: 'Leak detected',
      message: 'Continuous flow detected for 2 hours',
      device: 'Bathroom Meter',
      severity: 'Critical',
      icon: '⚠️',
      iconColor: 'text-red-500',
      badgeClass: 'bg-red-500 text-white',
    },
    {
      id: 2,
      title: 'Daily threshold exceeded',
      message: "Today’s usage above your 150 L/day",
      device: 'Kitchen Meter',
      severity: 'Warning',
      icon: '⚠️',
      iconColor: 'text-yellow-500',
      badgeClass: 'bg-yellow-400 text-white',
    },
  ];

  const yesterdayAlerts = [
    {
      id: 3,
      title: 'Daily threshold exceeded',
      message: "Today’s usage above your 200 L/day",
      device: 'Laundry Meter',
      severity: 'Warning',
      icon: '⚠️',
      iconColor: 'text-yellow-500',
      badgeClass: 'bg-yellow-400 text-white',
    },
  ];

  const renderAlertCard = function (alert) {
    return (
      <div
        key={alert.id}
        className="bg-white rounded-2xl shadow-md px-4 py-4 mb-4 border border-gray-200"
      >
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3 items-start">
            <div className={`text-2xl mt-1 ${alert.iconColor}`}>{alert.icon}</div>

            <div>
              <h3 className="text-[#005792] text-xl font-semibold leading-tight">
                {alert.title}
              </h3>
              <p className="text-gray-500 text-base mt-1">{alert.message}</p>

              <div className="flex items-center gap-2 mt-3">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                <span className="text-gray-500 text-sm">{alert.device}</span>
              </div>
            </div>
          </div>

          <span
            className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${alert.badgeClass}`}
          >
            {alert.severity}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-6 flex justify-center">
      <div className="w-full max-w-sm md:max-w-3xl lg:max-w-4xl pb-24">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#005792] mb-2">Alerts</h1>
        </div>

        {/* Today */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#005792] mb-4">Today</h2>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            {todayAlerts.map(renderAlertCard)}
          </div>
        </section>

        {/* Yesterday */}
        <section>
          <h2 className="text-2xl font-semibold text-[#005792] mb-4">Yesterday</h2>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            {yesterdayAlerts.map(renderAlertCard)}
          </div>
        </section>

        {/* Mobile Bottom Navigation */}
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

export default Alerts;