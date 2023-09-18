import mongoose from "mongoose";
const productModel = new mongoose.Schema({
  name: String,
  email: String,
  dob:String,
  number:Number
});
export const Product =
  mongoose.models.user || mongoose.model("user", productModel);
