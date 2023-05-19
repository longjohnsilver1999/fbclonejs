const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
router.get("/", (req, res) => {
  res.send("hey its profile route");
});

//update user
router.put("/:id", async (req, res) => {
  //console.log(req.body.profileId);
  if (req.body.profileId === req.params.id || req.profile.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const profile = await Profile.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("cannot update account");
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  //console.log(req.body.profileId);
  if (req.body.profileId === req.params.id || req.profile.isAdmin) {
    try {
      const profile = await Profile.deleteOne(req.params.id);
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("cannot update account");
  }
});
//get a user
//follow users
//unfollow user

module.exports = router;
