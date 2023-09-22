import { NextResponse } from "next/server";

export default (req, res) => {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        NextResponse.status(200).json({ status: "User is online" });
        break;
      case "POST":
        throw new Error("User status update failed");
      default:
        NextResponse.setHeader("Allow", ["GET", "POST"]);
        NextResponse.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error:", error.message);
    NextResponse.status(500).json({ error: "Internal Server Error" });
  }
};
