const express = require('express');
const router = express.Router();
const Projects = require('../modules/Projects');
const Users = require('../modules/Users');
const verify = require('./verifyToken');

router.use(verify);

router.post('/delete', async (req, res) => {
  try {
    const { _id } = req.body;

    await Projects.deleteOne({ _id });
    res.status(200).send({ success: true });
  } catch (e) {
    console.log(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).send(projects);
  } catch (e) {
    console.log(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, } = req.body;
    const { user } = req;

    const { login } = await Users.findOne({ _id: user._id });
    const createdBy = login;

    const project = new Projects({
      title,
      description,
      createdBy,
    })
    const savedProject = await project.save();

    res.status(200).send(savedProject);

  } catch (e) {
    console.log(e)
  }
});

module.exports = router;