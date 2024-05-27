const { authentication, random } = require("../helpers/index.js");
const {
  createUser,
  getUserByEmail,
  getUserByName,
  getUserBySessionToken,
} = require("../models/UserModel.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    const user = await getUserByEmail(email).select(
      "+authentication.salt + authentication.password"
    );
    if (!user)
      return res
        .status(400)
        .json({ message: "Incorrect Email or Password." })
        .end();

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash)
      return res
        .status(400)
        .json({ message: "Incorrect Email or Password." })
        .end();

    const salt = random();
    const authToken = authentication(salt, user._id.toString());
    user.authentication.sessionToken = authToken;
    await user.save();

    const currentUser = await getUserBySessionToken(authToken);

    return res
      .status(200)
      .json({
        message: "Account successfully logged in.",
        currentUser,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An internal server error occurred." })
      .end();
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingEmail = await getUserByEmail(email);
    if (existingEmail)
      return res
        .status(400)
        .json({ message: "The email provided already exist." })
        .end();
    const existingName = await getUserByName(name);
    if (existingName)
      return res
        .status(400)
        .json({ message: "The user name provided already exist." })
        .end();

    const salt = random();
    const user = await createUser({
      email,
      name,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res
      .status(200)
      .json({ message: "Account successfully created.", user })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An internal server error occurred." })
      .end();
  }
};

module.exports = { login, register };
