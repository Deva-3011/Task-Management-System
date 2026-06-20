const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const { listTasks, addTask, completeTask, removeTask } = require('../controllers/taskController');
const { getStats } = require('../controllers/statsController');

const router = express.Router();

router.use(authenticate);
router.get('/stats', getStats);
router.get('/', listTasks);
router.post('/', addTask);
router.patch('/:id/complete', completeTask);
router.delete('/:id', removeTask);

module.exports = router;
