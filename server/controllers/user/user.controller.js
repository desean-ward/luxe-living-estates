const bcrypt = require("bcrypt");
const User = require("../../models/user/user.model");
const errorHandler = require("../../utils/errors");
const Listing = require("../../models/listing/listing.model");

const updateUser = async (req, res, next) => {
  // Check if user is updating their own profile
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own profile"));
  }

  try {
    // Hash password
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    console.log("REQ", req.body);

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          role: req.body.role,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
          favorites: req.body.favorites,
        },
      },
      { new: true }
    );

    // Remove password from response
    const { password, ...rest } = updatedUser._doc;
    console.log("REST", rest);
    // Send response
    res.status(200).json(rest);
  } catch (error) {
    console.log("Update error", error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  // Check if user is deleting their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  }

  try {
    // Delete user
    await User.findByIdAndDelete(req.params.id);

    // Clear cookie
    res.clearCookie("token");

    // Send response
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

const getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only view your own listings"));
  }

  try {
    const listings = await Listing.find({ userRef: req.params.id });

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Get first 4 agents
const getAgents = async (req, res, next) => {
  try {
    const agents = await User.find({ role: "agent" });

    if (!agents) {
      return next(errorHandler(404, "Agents not found!"));
    }

    // Remove password from response
    for (let agent in agents) {
      const { password: pass, ...rest } = agents[agent]._doc;
      agents[agent] = rest;
    }
    res.status(200).json(agents);
  } catch (error) {
    next(error);
  }
};

// Export routes
module.exports = {
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
  getAgents,
};
