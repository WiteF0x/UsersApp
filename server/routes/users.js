const express = require('express');
const router = express.Router();
const Users = require('../modules/Users');
const verify = require('./verifyToken');

router.get('/getUsers/:number', verify, async (req, res) => {
  try {
    const skip = Number(5) * (Number(req.params.number) - Number(1));
    const users = await Users.aggregate([
      { $group: {
        _id: "$_id",
        userName: { "$last": "$userName" },
        firstName: { "$last": "$firstName" },
        lastName: { "$last": "$lastName" },
        userInfo: { "$last": "$userInfo" },
        userTypes: { "$last": "$userTypes" },
      } },
      { $skip: skip },
      { $limit: 5 },
    ]);
    res.json(users);
  } catch (err) {
    console.log(err);
  }
})

router.get('/countUsers', verify, async (req, res) => {
  try {
    const [count] = await Users.aggregate( [
      { $group: { _id: null, myCount: { $sum: 1 } } },
      { $project: { _id: 0 } }
    ] )

    res.json(count.myCount);

  } catch (error) {
    console.log('CountUsers error');
  }
})

// get userId from params
// return current user by id
router.get('/getProfile/:userId', verify, async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId);
    res.send({
      userId: user._id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      userInfo: user.userInfo,
      userTypes: user.userTypes,
    });
  } catch(err) {
    res.json({ messages: err })
  }
});

router.get('/getMyProfile', verify, async (req, res) => {
  const user = await Users.findById(req.user._id);
  res.send({
    userId: user._id,
    login: user.login,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    userInfo: user.userInfo,
    userTypes: user.userTypes,
  })
})

// get userId from params
// delete user by id
router.delete('/deleteUser', verify, async (req, res) => {
  try {
    await Users.deleteOne({ _id: req.body.userId });
    if (req.body.userId === req.user._id) {
      res.json({
        message: 'Completed!',
        isMyId: true,
      })
    } else {
      res.json({
        message: 'Completed!',
        isMyId: false,
      })
    }
  } catch (err) {
    res.json({ message: err })
  }
});

// get userId from params
// update user`s info 
router.patch('/updateUser', verify, async (req, res) => {
  try {
    const updatedUser = await Users.updateOne(
      { _id: req.user._id },
      {
        $set: {
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userInfo: req.body.userInfo,
          login: req.body.login,
        }
      }
    );
    console.log('updatedUser>>>', req.body);
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// get in req { userId, typeTitle }
// add new type for user
router.post('/type/add', verify, async (req, res) => {
  try {
    const id = req.body.userId === undefined ? req.user._id : req.body.userId;
    const user = await Users.findById(id);
    if (user.userTypes.indexOf(req.body.typeTitle) < 0) {
      await Users.updateOne(
        { _id: id },
        {
          $set: {
            userTypes: [...user.userTypes, req.body.typeTitle],
          }
        }
      )
      res.json({ message: 'Completed!' });
    } else {
      res.json({ message: 'User has this type already' });
    }
  } catch (err) {
    console.log(err);
  }
})

// get in req { userId, typeTitle }
// delete one type from user
router.delete('/type/remove', verify, async (req, res) => {
  try {
    const id = req.body.userId === undefined ? req.user._id : req.body.userId;
    console.log('Id>>>', id);
    await Users.updateOne(
      { _id: id },
      { $pull: { userTypes: { $in: req.body.typeTitle }}}
    );
    res.json({ message: 'Completed!' });
  } catch (err) {
    res.json({ message: 'Error' });
  }
})

router.get('/filterCount/:typeTitle', verify, async (req, res) => {
  try {
    const [count] = await Users.aggregate( [
      { $match: { userTypes: req.params.typeTitle } },
      { $group: { _id: null, myCount: { $sum: 1 } } },
      { $project: { _id: 0 } }
    ]);
    console.log(count.myCount === 'Error');
    res.json(count.myCount);
  } catch (error) {
    console.log('Error')
    res.json(0)
  }
})

// get typeTitle and number of page
// return sorted user list
router.get('/filter/:typeTitle/:number', verify, async (req, res) => {
  try {
    const skip = Number(5) * (Number(req.params.number) - Number(1));
    const users = await Users.aggregate([
      { $match: { userTypes: req.params.typeTitle } },
      { $group: {
        _id: "$_id",
        userName: { "$last": "$userName" },
        firstName: { "$last": "$firstName" },
        lastName: { "$last": "$lastName" },
        userTypes: { "$last": "$userTypes" },
      }},
      { $skip: skip },
      { $limit: 5 },
    ])
    console.log('skip>>>', skip);
    console.log('USERS>', users);
    res.json(users);
  } catch (err) {
    res.json({ message: 'Error' });
  }
})


module.exports = router;