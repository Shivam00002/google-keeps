// authHelpers.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = require("../config/firebaseConfig");

const authHelpers = {
  createToken: (payload, expiresIn) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  },

  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
  decode:(token)=>{
    return jwt.decode(token);
  },
  hashPassword: async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  },

  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },

  setSecureCookie: (res, name, value, maxAge) => {
    res.cookie(name, value, {
      maxAge: maxAge,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  },
};

module.exports = authHelpers;
