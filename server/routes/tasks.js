const express = require('express');
const router = express.Router();
const Tasks = require('../modules/Tasks');
const Users = require('../modules/Users');
const verify = require('./verifyToken');

router.use(verify);

router.post('/delete', async (req, res) => {
  try {
    const { _id } = req.body;

    await Tasks.deleteOne({ _id });
    res.status(200).send({ success: true });
  } catch (e) {
    console.log(e);
  }
});

router.post('/getTasks', async (req, res) => {
  try {
    const { project } = req.body;

    const tasks = await Tasks.find({ project });
    res.status(200).send(tasks);
  } catch (e) {
    console.log(e);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await Users.find();

    res.status(200).send(users);
  } catch (e) {
    console.log(e)
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, description, priority, assignedTo, project, startedAt, endedAt } = req.body;
    const { user } = req;

    const { login } = await Users.findOne({ _id: user._id });
    const createdBy = login;

    const task = new Tasks({
      title,
      description,
      priority,
      assignedTo,
      project,
      createdBy,
      startedAt,
      endedAt,
    });

    const createdTask = await task.save();

    res.status(200).send(createdTask);

  } catch (e) {
    console.log(e)
  }
});

module.exports = router;