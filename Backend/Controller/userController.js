const userModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

/* --------------------------------- SignUp --------------------------------- */
const signUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Please Enter Both Email And Password. ",
    });
  }
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "Email Already Exists ",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ email, password: hashedPassword });
    // let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
    return res.status(201).json({
      message: "User Created Successfully!!!!!!!!!!",
      data: { /*token,*/ newUser },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/* ---------------------------------- LogIn --------------------------------- */
const logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Please Enter Both Email And Password. ",
    });
  }
  try {
    let user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        message: "Login Successfully..",
        data: user,
      });
    } else {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/* ------------------------------- GetUserById ------------------------------ */
const getUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.json({ email: user.email });
};

module.exports = { signUp, logIn, getUser };
