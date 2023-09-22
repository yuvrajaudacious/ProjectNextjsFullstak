import { connection } from "@/lib/db";
import User from "@/lib/model/add";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false,
  });

  try {
    const reqBody = await req.json();

    const { email, dateOfBirth, age, number, userName, gender } = reqBody;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" });
    }

    const newUser = new User({
      email,
      dateOfBirth,
      age,
      number,
      userName,
      gender,
    });
    await newUser.save();
    console.log("sasaf", newUser);
    return NextResponse.json({ message: "User Are Added" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
export async function GET() {
  let data = [];
  let success = true;
  try {
    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    });
    data = await User.find();
  } catch (error) {
    data = { result: "error" };
    success = false;
  }
  return NextResponse.json({ result: data, success });
}
