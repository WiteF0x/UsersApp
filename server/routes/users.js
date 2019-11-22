const express = require('express');
const router = express.Router();
const Users = require('../modules/Users');
const verify = require('./verifyToken');
const USERS_PER_PAGE = require('../constants');

router.use(verify);

router.get('/getUsers/:number', async (req, res) => {
  try {
    const { number } = req.params;

    const skip = Number(USERS_PER_PAGE) * (Number(number) - Number(1));
    const count = await Users.countDocuments();
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
    res.json({ users: users, count: count });
  } catch (err) {
    console.log(err);
  }
})

// get userId from params
// return current user by id
router.get('/getProfile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findById(userId);
    const { _id, userName, firstName, lastName, userInfo, userTypes} = user;
    res.send({ userId: _id, userName, firstName, lastName, userInfo, userTypes });
  } catch(err) {
    res.json({ messages: err })
  }
});

router.get('/getMyProfile', async (req, res) => {
  const user = await Users.findById(req.user._id);
  const { _id: userId, login, userName, firstName, lastName, userInfo, userTypes } = user;
  res.send({ userId, login, userName, firstName, lastName, userInfo, userTypes });

})

// get userId from params
// delete user by id
router.delete('/deleteUser', async (req, res) => {
  try {
    const { userId } = req.body;
    const { _id } = req.user;
    await Users.deleteOne({ _id: userId });
    if (userId === _id) {
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
router.patch('/updateUser', async (req, res) => {
  try {
    const { userName, firstName, lastName, userInfo, login } = req.body;
    const { _id } = req.user;
    const updatedUser = await Users.updateOne(
      { _id: _id },
      {
        $set: {
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          userInfo: userInfo,
          login: login,
        }
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// get in req { userId, typeTitle }
// add new type for user
router.post('/type/add', async (req, res) => {
  try {
    const user = await Users.findById(req.body.userId);
    if (user.userTypes.indexOf(req.body.typeTitle) < 0) {
      await Users.updateOne(
        { _id: req.body.userId },
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
router.delete('/type/remove/:typeTitle/:userId', async (req, res) => {
  try {
    const { typeTitle, userId } = req.params;
    if (typeTitle !== 'defaultUser') {
      await Users.updateOne(
        { _id: userId },
        { $pull: { userTypes: { $in: typeTitle }}}
      );
      res.json({ message: 'Completed!' });
    }
  } catch (err) {
    res.json({ message: 'Error' });
  }
})

// get typeTitle and number of page
// return sorted user list
router.get('/filter/:typeTitle/:number', async (req, res) => {
  try {
    const skip = Number(USERS_PER_PAGE) * (Number(req.params.number) - Number(1));
    const count = await Users.countDocuments({ userTypes: req.params.typeTitle })
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
    console.log('count>>>', count);
    res.json({ users: users, count: count });
  } catch (err) {
    res.json({ message: 'Error' });
  }
})


module.exports = router;