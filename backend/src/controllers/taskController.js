const asyncHandler = require('../utils/asyncHandler');
const { normalizeTaskQuery } = require('../utils/taskQuery');
const { validateTaskPayload } = require('../utils/taskValidation');
const {
  findTasksByUser,
  countTasksByUser,
  createTask,
  markTaskCompleted,
  deleteTask
} = require('../models/taskModel');

const listTasks = asyncHandler(async (req, res) => {
  const filters = normalizeTaskQuery(req.query);
  const [tasks, total] = await Promise.all([
    findTasksByUser(req.user.id, filters),
    countTasksByUser(req.user.id, filters)
  ]);

  const totalPages = Math.max(1, Math.ceil(total / filters.limit));

  return res.json({
    tasks,
    pagination: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages
    }
  });
});

const addTask = asyncHandler(async (req, res) => {
  const validation = validateTaskPayload(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: 'Task validation failed.',
      errors: validation.errors
    });
  }

  const task = await createTask(req.user.id, validation.value);
  return res.status(201).json({ task });
});

const completeTask = asyncHandler(async (req, res) => {
  const taskId = Number.parseInt(req.params.id, 10);

  if (!Number.isInteger(taskId)) {
    return res.status(400).json({ message: 'Valid task id is required.' });
  }

  const updated = await markTaskCompleted(req.user.id, taskId);

  if (!updated) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  return res.json({ message: 'Task marked as completed.' });
});

const removeTask = asyncHandler(async (req, res) => {
  const taskId = Number.parseInt(req.params.id, 10);

  if (!Number.isInteger(taskId)) {
    return res.status(400).json({ message: 'Valid task id is required.' });
  }

  const deleted = await deleteTask(req.user.id, taskId);

  if (!deleted) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  return res.json({ message: 'Task deleted successfully.' });
});

module.exports = {
  listTasks,
  addTask,
  completeTask,
  removeTask
};
