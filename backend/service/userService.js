const User = require('../models/User');

async function getUsers() {
  try {
    // Query only users with role 'user'
    return await User.find({ role: 'user' });
  } catch (error) {
    throw new Error('Error fetching users');
  }
}

// Implement the login logic
async function login(email, password) {
  return await User.findOne({ email, password }).select("-password");
}

async function register(userData) {
  userData.role = 'user';
  return await User.create(userData);
}

async function deleteAccount(email, password){
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    // Delete the user
    await user.deleteOne();

    return { success: true };
  } catch (error) {
    throw error;
  }
};


async function updatePassword(email, currentPassword, newPassword){
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the current password matches
    if (user.password !== currentPassword) {
      throw new Error('Incorrect current password');
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    return { success: true };
  } catch (error) {
    throw error;
  }
};


async function getTotalUsersCount(){
  try {
    const count = await User.countDocuments();
    return count;
  } catch (error) {
    throw new Error('Error fetching total users count');
  }
};
module.exports = {
  getUsers,
  login,
  register,
  deleteAccount,
  updatePassword,
  getTotalUsersCount
};
