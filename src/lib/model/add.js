import mongoose from "mongoose";
const Adduser = new mongoose.Schema({
  email: String,
  userName: String,
  dateOfBirth: String,
  age: Number,
  number: Number,
  gender:String,
});
const User = mongoose.models.adduser || mongoose.model("adduser", Adduser);
export default User;
