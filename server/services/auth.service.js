const userRepository = require("../repositories/user.repository");
const bcrypt = require('bcrypt')

exports.login = async (username, password) => {
  // Fetch user from DB
  const user = await userRepository.findByUsername(username);

  if (!user) {
    throw new Error("User not found");
  }

  // compare plain password and hashed password
   const checkPassword = await bcrypt.compare(password,user.password)
   if(!checkPassword){
    throw new Error("Invalid credential")
   }
  // Return minimal user data
  return {
    id: user.id,
    username: user.username,
  };
};
