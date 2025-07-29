const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const allowedUpdates = ["name", "email", "company"];
    const updates = {};
    for (const key of allowedUpdates) {
      if (req.body[key]) updates[key] = req.body[key];
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ error: "Could not update user" });
  }
};

module.exports = { getUsers, getUserById, updateUser };
