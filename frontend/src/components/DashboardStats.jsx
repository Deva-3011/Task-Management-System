function DashboardStats({ stats }) {
  const cards = [
    { label: 'Total Tasks', value: stats.totalTasks, accent: 'stat-total' },
    { label: 'Pending', value: stats.pendingTasks, accent: 'stat-pending' },
    { label: 'In Progress', value: stats.inProgressTasks, accent: 'stat-progress' },
    { label: 'Completed', value: stats.completedTasks, accent: 'stat-completed' }
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => (
        <div className="col-12 col-sm-6 col-xl-3" key={card.label}>
          <div className={`stat-card ${card.accent}`}>
            <p className="stat-label">{card.label}</p>
            <h3 className="stat-value">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
