import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";

// export const GET = async () => {
//   try {
//     await dbConnect();
//     return NextResponse.json({ success: true, message: "MongoDB connected!" });
//   } catch (error) {
//     console.error("DB connection error:", error);
//     return NextResponse.json(
//       { success: false, message: "Connection failed" },
//       { status: 500 },
//     );
//   }
// };

export async function GET() {
  try {
    await dbConnect()
    const count = await User.countDocuments()
    return NextResponse.json({ success: true, userCount: count })
  } catch (error) {
    console.error("DB error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}