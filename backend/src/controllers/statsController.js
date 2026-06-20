const asyncHandler = require('../utils/asyncHandler');
const { getTaskStats } = require('../models/taskModel');

const getStats = asyncHandler(async (req, res) => {
  const stats = await getTaskStats(req.user.id);

  return res.json({
    stats: {
      totalTasks: Number(stats.totalTasks || 0),
      pendingTasks: Number(stats.pendingTasks || 0),
      inProgressTasks: Number(stats.inProgressTasks || 0),
      completedTasks: Number(stats.completedTasks || 0)
    }
  });
});

module.exports = {
  getStats
};
