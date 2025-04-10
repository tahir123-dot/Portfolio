const { generateToken } = require("../middleware/authMiddleware");
const User = require("../models/signup");

const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    const response = await newUser.save();

    const token = generateToken(response.name);

    res.status(201).json({ response: response, token: token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const finduser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (finduser) {
      const token = generateToken(finduser.email);
      res.status(200).json({
        message: "Successfully login ",
        user: {
          id: finduser._id,
          name: finduser.name,
          email: finduser.email,
        },
        token: token,
      });
    } else {
      console.log("user not found");
      res.status("404").json({ message: "User not found" });
      return;
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};



module.exports = { Signup, Login };
