function formatDate(value) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

function TaskCard({ task, onComplete, onDelete }) {
  const statusClass =
    task.status === 'Completed' ? 'badge-completed' : task.status === 'In Progress' ? 'badge-progress' : 'badge-pending';

  return (
    <article className="task-card h-100">
      <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
        <div>
          <h3 className="task-title">{task.title}</h3>
          <span className={`task-status ${statusClass}`}>{task.status}</span>
        </div>
        <small className="task-date">{formatDate(task.created_at)}</small>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="d-flex flex-wrap gap-2 mt-auto">
        <button
          type="button"
          className="btn btn-sm btn-success"
          onClick={() => onComplete(task.id)}
          disabled={task.status === 'Completed'}
        >
          Complete Task
        </button>
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(task.id)}>
          Delete Task
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
