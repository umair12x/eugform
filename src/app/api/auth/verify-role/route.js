import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 },
        );
      }
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");

    // If specific role is requested
    if (role) {
      const existingUser = await User.findOne({ role });
      return NextResponse.json(
        {
          exists: !!existingUser,
          role,
        },
        { status: 200 },
      );
    }

    // If no role specified, check all admin roles
    const adminRoles = ["admin", "dg-office", "fee-office"];
    const results = {};

    for (const role of adminRoles) {
      const existingUser = await User.findOne({ role });
      results[role] = !!existingUser;
    }

    // Also return if any admin role exists (for backward compatibility)
    const anyAdminExists = Object.values(results).some((exists) => exists);

    return NextResponse.json(
      {
        adminExists: anyAdminExists,
        roles: results,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Verify role error:", err);
    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
