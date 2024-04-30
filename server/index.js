const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/userModel");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017").then(() => {
  console.log("database connected");
});

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      messsage: "Couldn't get users",
    });
  }
});
app.post("/createUser", (req, res) => {
  try {
    const newUser = User.create(req.body);
    res.status(200).json({
      status: "success",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      messsage: "Couldn't create user",
    });
  }
});
app.patch("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      messsage: "Couldn't update user",
    });
  }
});
app.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      messsage: "Couldn't delete user",
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
