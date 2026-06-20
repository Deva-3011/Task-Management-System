const createStatuses = new Set(['Pending', 'In Progress']);
const allStatuses = new Set(['Pending', 'In Progress', 'Completed']);

function validateTaskPayload(payload = {}, options = {}) {
  const allowCompleted = Boolean(options.allowCompleted);
  const title = typeof payload.title === 'string' ? payload.title.trim() : '';
  const description = typeof payload.description === 'string' ? payload.description.trim() : '';
  const status = typeof payload.status === 'string' ? payload.status.trim() : '';
  const errors = [];
  const allowedStatuses = allowCompleted ? allStatuses : createStatuses;

  if (!title) {
    errors.push('Title is required.');
  }

  if (description.length < 20) {
    errors.push('Description must be at least 20 characters.');
  }

  if (!allowedStatuses.has(status)) {
    errors.push(`Status must be one of: ${Array.from(allowedStatuses).join(', ')}.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      title,
      description,
      status
    }
  };
}

module.exports = {
  validateTaskPayload
};
