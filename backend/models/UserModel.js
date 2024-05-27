const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

const getUsers = () => UserModel.find();
const getUserByEmail = (email) => UserModel.findOne({ email });
const getUserByName = (name) => UserModel.findOne({ name });
const getUserBySessionToken = (sessionToken) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
const getUserById = (id) => UserModel.findById(id);
const createUser = (values) =>
  new UserModel(values).save().then((user) => user.toObject());
const deleteUserById = (id) => UserModel.findOneAndDelete({ _id: id });
const updateUserById = (id, values) => UserModel.findByIdAndUpdate(id, values);

module.exports = {
  getUsers,
  getUserByEmail,
  getUserByName,
  getUserBySessionToken,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
