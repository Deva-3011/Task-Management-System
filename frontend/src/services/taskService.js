import api from './api';

export async function getTasks(params = {}) {
  const { data } = await api.get('/tasks', { params });
  return data;
}

export async function getTaskStats() {
  const { data } = await api.get('/tasks/stats');
  return data;
}

export async function createTask(payload) {
  const { data } = await api.post('/tasks', payload);
  return data;
}

export async function completeTask(taskId) {
  const { data } = await api.patch(`/tasks/${taskId}/complete`);
  return data;
}

export async function deleteTask(taskId) {
  const { data } = await api.delete(`/tasks/${taskId}`);
  return data;
}
