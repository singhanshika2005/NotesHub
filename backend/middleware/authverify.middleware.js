const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const AuthModel = require("../schema/auth.model");

const AuthVerify = async (req, res, next) => {
  try {
    const token = req.header("auth-token");

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Plz login!",
      });
    }

    const decode = jwt.verify(token, SECRET_KEY);

    if (!decode.id) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Plz login!",
      });
    }

    const user = await AuthModel.findById(decode.id);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Account does not exist!",
      });
    }

    req.user = user._id;
    next();
  } catch (error) {
    console.log("AuthVerify Error:", error.message);

    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = AuthVerify;