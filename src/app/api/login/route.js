import { connection } from "@/lib/db";
import Login from "@/lib/model/login";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req, response) {
  await mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false, 
  });

  try {
    const reqBody = await req.json();
    console.log("reqBody", reqBody);
    const { email, password } = reqBody;
    const user = await Login.findOne({ email });

    if (!user) {
      return response.json({ message: "User not found" }, { status: 401 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    if (password === user.password) {
      return NextResponse.json(
        { message: "Login successful", success: true, token },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
