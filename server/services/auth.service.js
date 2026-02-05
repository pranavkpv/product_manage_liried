const userRepository = require("../repositories/user.repository");

exports.login = async (username, password) => {
  // Fetch user from DB
  const user = await userRepository.findByUsername(username);

  if (!user) {
    throw new Error("User not found");
  }

  // Simple password check (plain text for assignment)
  if (user.password !== password) {
    throw new Error("Invalid password");
  }

  // Return minimal user data
  return {
    id: user.id,
    username: user.username,
  };
};
