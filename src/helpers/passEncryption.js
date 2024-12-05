const bcrypt = require("bcrypt");

const passwordEncryption =  (req) => {
  const { password } = req.body;
  return  bcrypt.hash(password, 10);
};

module.exports = passwordEncryption;
