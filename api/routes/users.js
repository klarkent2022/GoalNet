const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//UPDATING USER
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {//check if one's trying to update his own info
	  if (req.body.password) {//if the request's trying to change password
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);//we hash the password inside our request body
      } catch (err) {
        return res.status(500).json(err);
      }
	  }
	  try {
      const user = await User.findByIdAndUpdate(req.params.id, //id written in url, not request
        {$set: req.body}); //update everything mentioned in req.body
      res.status(200).json("Account has been updated");
	  } catch (err) {
		  return res.status(500).json(err);
	  }
	} else {
	  return res.status(403).json("You can update only your account!");
	}
  });

//DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {//check if user is trying to delete his own account
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//GET A USER
router.get("/", async (req, res) => {
  const userId = req.query.userId; //we have queries here, as /?userId
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    //'user' is also JS object, but it contains many useless properties such as method declarations
    //so below we use use._doc to 
    const { password, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json(other);//the server doesn't give informations of password, updatedAt, createdAt
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    /* The .map() method creates a new array of promises, 
    each one representing a database query to retrieve 
    a friend's data. These promises are passed to 
    Promise.all(), which waits for all the promises to 
    resolve and returns an array of resolved values. In 
    this case, the resolved values are the friend objects
    retrieved from the database.*/
    const friends = await Promise.all(
      user.followings.map((friendId) => User.findById(friendId)) //no need to write await before User.findById
    );

    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend; //destructuring some properties
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {//not trying to follow himself
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) { //only if the current user is not subscribed already
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;