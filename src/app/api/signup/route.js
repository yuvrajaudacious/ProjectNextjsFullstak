import { connection } from "@/lib/db";
import Login from "@/lib/model/login";
import bcrypt from "bcrypt";
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

    // console.log("reqBody", reqBody);
    const { email, password, dateOfBirth, age, number, userName } = reqBody;

    const existingUser = await Login.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new Login({
      email,
      password: hashedPassword,
      dateOfBirth,
      age,
      number,
      userName,
    });
    await newUser.save();
    console.log(newUser);
    return NextResponse.json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
