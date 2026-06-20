import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardStats from '../components/DashboardStats';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import TaskCard from '../components/TaskCard';
import TaskFilters from '../components/TaskFilters';
import { completeTask, deleteTask, getTaskStats, getTasks } from '../services/taskService';

const defaultFilters = {
  search: '',
  status: '',
  order: 'DESC',
  page: 1,
  limit: 6
};

function DashboardPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ totalTasks: 0, pendingTasks: 0, inProgressTasks: 0, completedTasks: 0 });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const apiParams = useMemo(
    () => ({
      search: filters.search,
      status: filters.status,
      order: filters.order,
      page: filters.page,
      limit: filters.limit
    }),
    [filters]
  );

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [taskResponse, statsResponse] = await Promise.all([getTasks(apiParams), getTaskStats()]);
      setTasks(taskResponse.tasks || []);
      setPagination(taskResponse.pagination || { page: 1, totalPages: 1, total: 0 });
      setStats(statsResponse.stats || stats);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [apiParams.search, apiParams.status, apiParams.order, apiParams.page, apiParams.limit]);

  const updateFilter = (field, value) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
      page: field === 'page' ? value : 1
    }));
  };

  const handleComplete = async (taskId) => {
    setActionLoading(true);

    try {
      await completeTask(taskId);
      await loadData();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to complete task.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm('Delete this task?');
    if (!confirmDelete) {
      return;
    }

    setActionLoading(true);

    try {
      await deleteTask(taskId);
      await loadData();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to delete task.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="page-panel">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Manage your project tasks</h1>
            <p className="section-copy mb-0">Filter work, monitor progress, and keep the team moving.</p>
          </div>
          <Link to="/tasks/new" className="btn btn-info fw-semibold">
            Add Task
          </Link>
        </div>

        <DashboardStats stats={stats} />

        <TaskFilters
          filters={filters}
          onChange={updateFilter}
          onSearch={() => setFilters((current) => ({ ...current, page: 1 }))}
        />

        {loading ? <LoadingSpinner /> : null}

        {error ? <div className="alert alert-danger">{error}</div> : null}

        {!loading && !error && tasks.length === 0 ? (
          <div className="empty-state">
            <h2>No tasks yet</h2>
            <p>Create your first task to start tracking work.</p>
            <Link to="/tasks/new" className="btn btn-info fw-semibold">
              Add your first task
            </Link>
          </div>
        ) : null}

        {!loading && tasks.length > 0 ? (
          <>
            <div className="row g-3">
              {tasks.map((task) => (
                <div className="col-12 col-md-6 col-xl-4" key={task.id}>
                  <TaskCard task={task} onComplete={handleComplete} onDelete={handleDelete} />
                </div>
              ))}
            </div>
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(nextPage) => updateFilter('page', Math.max(1, nextPage))}
            />
          </>
        ) : null}

        {actionLoading ? <div className="action-busy">Updating task...</div> : null}
      </section>
    </main>
  );
}

export default DashboardPage;
