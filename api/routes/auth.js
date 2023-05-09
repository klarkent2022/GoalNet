const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
	try {
		var username = req.body.username;
		var email = req.body.email;
		var password = req.body.password;

		const salt = await bcrypt.genSalt(10);
    	var password = await bcrypt.hash(password, salt);

		//create & save a new user
		const registerUser = new User({
			username,
			email,
			password,
		});
		const user = await registerUser.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
})

//LOGIN
router.post("/login", async (req, res) => {
	try {
	  const user = await User.findOne({ email: req.body.email });
	  !user && res.status(404).json("user not found");
  
	  const validPassword = await bcrypt.compare(req.body.password, user.password)
	  !validPassword && res.status(400).json("wrong password")
  
	  res.status(200).json(user)
	} catch (err) {
	  res.status(500).json(err)
	}
  });


module.exports = router;