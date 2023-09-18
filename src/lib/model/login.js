import mongoose from "mongoose";
const AdminModel = new mongoose.Schema({
  email: String,
  userName: String,
  password: String,
  dateOfBirth: String,
  age: Number,
  number: Number,
});
const Login = mongoose.models.admin || mongoose.model("admin", AdminModel);
export default Login;
