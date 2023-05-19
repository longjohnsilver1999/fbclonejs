const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
//register
router.post("/register/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newprofile = new Profile({
      profilename: req.body.profilename,
      email: req.body.email,
      password: hashedPassword,
    });
    const profile = await newprofile.save();
    res.status(200).json(profile);
  } catch (err) {
    res.json(500).json(err);
  }
  //   await profile.save();
  //   res.send("ok, thanks for using db");
  //   //res.send("hey its auth route");
});

//login
router.post("/login/", async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.body.email });
    !profile && res.status(404).json("profile not found");

    const validPassword = bcrypt.compare(
      JSON.stringify(req.body.password),
      JSON.stringify(profile.password)
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
