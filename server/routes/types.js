const express = require('express');
const router = express.Router();
const UserTypes = require('../modules/UserTypes');
const Users = require('../modules/Users');
const verify = require('./verifyToken');

router.use(verify)

router.get('/getTypes', async (req, res) => {
  try {
    const types = await UserTypes.find();
    res.send({ types });
  } catch (err) {
    console.log(err);
  }
})

router.patch('/update', async (req, res) => {
  try {
    const currentType = await UserTypes.findById(req.body.typeId);
    await Users.updateMany(
      { userTypes: currentType.typeTitle },
      { $set: { "userTypes.$" : req.body.typeTitle } }
    )
    await UserTypes.updateOne(
      { _id: req.body.typeId },
      {
        $set: {
          typeTitle: req.body.typeTitle,
        }
      }
    );
    res.json({ message: 'Completed!' });
  } catch (err) {
    console.log('Error at types patch');
  }
})

// get typeTitle
router.post('/create', async (req, res) => {
  try {
    const alreadyCreated = await UserTypes.find({ typeTitle: req.body.typeTitle });
    if (req.body.typeTitle !== '' && alreadyCreated.length === 0) {
      const newType = new UserTypes({
        typeTitle: req.body.typeTitle
      })
      const savedType = await newType.save();
      res.json(savedType);
    } else {
      res.json({
        message: req.body.typeTitle !== '' ? 'Title of the type can`t be empty' : 'This title already exists'
      });
    }
  } catch (err) {
    res.json({ message: err });
  }
})

//get typeId as params
router.delete('/:typeId', async (req, res) => {
  const currentType = await UserTypes.findById(req.params.typeId);
  if (currentType.typeTitle !== 'defaultUser') {
    await Users.updateMany(
      { $pull: { userTypes: { $in: currentType.typeTitle } } }
    );
    await UserTypes.deleteOne({ _id: req.params.typeId });
    res.json({ message: 'Type was deleted' });
  }
})

module.exports = router;