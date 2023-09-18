import { connection } from "@/lib/db";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import axios from 'axios';

export async function GET() {
  let data = [];
  let success = true;
  try {
    await mongoose.connect(connection);
    data = await Product.find();
  } catch (error) {
    data = { result: "error" };
    success = false;
  }
  return NextResponse.json({ result: data, success });
}
export async function POST(request) {
  await mongoose.connect(connection);
  let payload = await request.json();
  const data = new Product(payload);
  await data.save();

  console.log(payload);
  if (!payload.name || !payload.email || !payload.dob || !payload.number) {
    return NextResponse.json(
      {
        result: "Require field",
        success: false,
      },
      { status: 400 }
    );
  }
  return NextResponse.json({ result: payload, success: true }, { status: 200 });
}
