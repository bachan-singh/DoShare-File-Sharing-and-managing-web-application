const userService = require('../service/userService');
const Users = require('../models/User');

async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Define the login controller function
async function login(req, res) {
  try {
    if (req.body.password && req.body.email) {
      const user = await userService.login(req.body.email, req.body.password);
      if (user) {
        res.send(user);
      } else {
        res.send({ result: "User Not Found" });
      }
    } else {
      res.send({ result: "Email or Password is missing" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function register(req, res) {
  try {
    const newUser = await userService.register(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const deleteUser = async(req, res)=>{
  try{
    const id = req.params.id;
    const userExist = await Users.findById(id);
    if(!userExist){
      return res.status(404).json({msg: "user not exist"})
    }
    await Users.findByIdAndDelete(id);
    res.status(200).json({msg:"user Deleted Successfully"})
  }
  catch(error){
    res.status(500).json({error: error})
  }
}



async function deleteAccountController (req, res) {
  const { email, password } = req.body;

  try {
    // Call the service function to delete the account
    const result = await userService.deleteAccount(email, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function updatePasswordController(req, res){
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Call the service function to update the password
    const result = await userService.updatePassword(email, currentPassword, newPassword);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function getTotalUsersCount(req, res){
  try {
    const count = await userService.getTotalUsersCount();
    res.json({ totalUsers: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};










module.exports = {
  getUsers,
  login,
  register,
  deleteUser,
  deleteAccountController,
  updatePasswordController,
  getTotalUsersCount
};
