const express = require('express');
const router = express.Router();
const Users = require('../modules/Users');
const verify = require('./verifyToken');
const USERS_PER_PAGE = require('../constants');

router.get('/getUsers/:number', verify, async (req, res) => {
  try {
    const { number } = req.params;

    const skip = Number(USERS_PER_PAGE) * (Number(number) - Number(1));
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
    const { userId } = req.params;
    const user = await Users.findById(userId);
    const { _id, userName, firstName, lastName, userInfo, userTypes} = user;
    res.send({ userId: _id, userName, firstName, lastName, userInfo, userTypes });
  } catch(err) {
    res.json({ messages: err })
  }
});

router.get('/getMyProfile', verify, async (req, res) => {
  const user = await Users.findById(req.user._id);
  const { _id: userId, login, userName, firstName, lastName, userInfo, userTypes } = user;
  res.send({ userId, login, userName, firstName, lastName, userInfo, userTypes });

})

// get userId from params
// delete user by id
router.delete('/deleteUser', verify, async (req, res) => {
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
router.patch('/updateUser', verify, async (req, res) => {
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
router.post('/type/add', verify, async (req, res) => {
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
router.delete('/type/remove/:typeTitle/:userId', verify, async (req, res) => {
  try {
    const { typeTitle, userId } = req.params;
    console.log('req.params', req.params);
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

router.get('/filterCount/:typeTitle', verify, async (req, res) => {
  try {
    const { typeTitle } = req.params;
    const [count] = await Users.aggregate( [
      { $match: { userTypes: typeTitle } },
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
    const skip = Number(USERS_PER_PAGE) * (Number(req.params.number) - Number(1));
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
    res.json(users);
  } catch (err) {
    res.json({ message: 'Error' });
  }
})


module.exports = router;