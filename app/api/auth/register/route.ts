import { NextRequest, NextResponse } from "next/server";
import { db, usersTable } from "@/lib/drizzle/schema";
import { eq, ne } from "drizzle-orm";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const ts = new Date(Date.now());

  try {
    const res = await db.insert(usersTable).values({
      id: req.id,
      name: req.username,
      email: req.useremail,
      passwordHash: req.userpassword,
      createdAt: ts,
      phone: req?.phone,
    }).returning();
    console.log(res);
    return NextResponse.json({ res, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, success: false });
  }
};
export const GET = async (request: NextRequest) => {
  const req = request.nextUrl;
  try {
    const res = await db.select().from(usersTable);
    console.log(res);
    return NextResponse.json({ res, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong in GET method",
      success: false,
    });
  }
};