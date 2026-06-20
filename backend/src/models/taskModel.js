const { query } = require('../config/db');

function buildTaskFilters(userId, filters = {}) {
  const clauses = ['user_id = ?'];
  const params = [userId];

  if (filters.search) {
    clauses.push('(LOWER(title) LIKE ? OR LOWER(description) LIKE ?)');
    const searchTerm = `%${filters.search.toLowerCase()}%`;
    params.push(searchTerm, searchTerm);
  }

  if (filters.status) {
    clauses.push('status = ?');
    params.push(filters.status);
  }

  return {
    whereClause: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    params
  };
}

async function findTasksByUser(userId, filters = {}) {
  const { whereClause, params } = buildTaskFilters(userId, filters);
  const sql = `
    SELECT id, title, description, status, created_at, updated_at
    FROM tasks
    ${whereClause}
    ORDER BY ${filters.sort || 'created_at'} ${filters.order || 'DESC'}
    LIMIT ? OFFSET ?
  `;

  const [rows] = await query(sql, [...params, filters.limit, filters.offset]);
  return rows;
}

async function countTasksByUser(userId, filters = {}) {
  const { whereClause, params } = buildTaskFilters(userId, filters);
  const [rows] = await query(`SELECT COUNT(*) AS total FROM tasks ${whereClause}`, params);
  return rows[0]?.total || 0;
}

async function getTaskStats(userId) {
  const [rows] = await query(
    `SELECT
      COUNT(*) AS totalTasks,
      SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pendingTasks,
      SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) AS inProgressTasks,
      SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completedTasks
    FROM tasks
    WHERE user_id = ?`,
    [userId]
  );

  return rows[0] || {
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0
  };
}

async function createTask(userId, { title, description, status }) {
  const [result] = await query(
    'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
    [userId, title, description, status]
  );

  const [rows] = await query(
    'SELECT id, title, description, status, created_at, updated_at FROM tasks WHERE id = ? AND user_id = ? LIMIT 1',
    [result.insertId, userId]
  );

  return rows[0] || null;
}

async function markTaskCompleted(userId, taskId) {
  const [result] = await query(
    "UPDATE tasks SET status = 'Completed' WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );

  return result.affectedRows > 0;
}

async function deleteTask(userId, taskId) {
  const [result] = await query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
  return result.affectedRows > 0;
}

module.exports = {
  findTasksByUser,
  countTasksByUser,
  getTaskStats,
  createTask,
  markTaskCompleted,
  deleteTask
};
