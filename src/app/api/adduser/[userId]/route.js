import { connection } from "@/lib/db";
import User from "@/lib/model/add";
import mongoose from "mongoose";
import axios from "axios";
import { NextResponse } from "next/server";
export async function GET(request, content) {
  try {
    const userId = content.params.userId;
    const filter = { _id: userId };
    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    });
    const user = await User.findOne(filter);
    
    console.log("user", filter);
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    } else {
      return NextResponse.json({
        user,
        success: true,
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      message: "An error occurred while fetching user details",
      success: false,
    });
  }
}
export async function PUT(request, content) {
  try {
    const userId = content.params.userId;
    const filter = { _id: userId };
    const payload = await request.json();

    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    });

    const result = await User.findOneAndUpdate(filter, payload);

    if (!result) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify({ result: payload, success: true }), {});
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request, content) {
  try {
    const userId = content.params.userId;
    const record = { _id: userId };
    console.log(record);

    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    });

    const result = await User.deleteOne(record);

    if (result.deletedCount === 1) {
      return NextResponse.json({
        message: "User Deleted Successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      message: "An error occurred while deleting the user",
      success: false,
    });
  }
}
