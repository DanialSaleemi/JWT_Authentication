import { NextRequest, NextResponse } from "next/server";
import { db, usersTable } from "@/lib/drizzle/schema";
import { eq, ne } from "drizzle-orm";
import { signJWT } from "@/lib/token";
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { compare } from "bcryptjs";
import { ZodError } from "zod";
import { getErrorResponse } from "@/lib/helpers";

export const GET = async (request: NextRequest) => {
  const req = await request.nextUrl;
  const userEmail = req.searchParams.get("email") as string;

  try {
    const res = await db
      //   .select({Password: usersTable.passwordHash})
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    console.log(res);
    return NextResponse.json({ res, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, success: false });
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);

    const user = await db
      .selectDistinct()
      .from(usersTable)
      .orderBy(usersTable.id)
      .where(eq(usersTable.email, data.email));
    const pwd = user[0].passwordHash;
    if (!user || !(await compare(data.password, pwd))) {
      return getErrorResponse(401, "Invalid email or password");
    }
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

    const token = await signJWT(
      {
        sub: user[0].id as unknown as string,
      },
      {
        exp: `${JWT_EXPIRES_IN}m`,
      }
    );

    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
    const cookieOptions = {
      name: "token",
      value : token,
      httpOnly: true,
      path : "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token,
      }),
      {
        status: 200,
        headers: { "Content-Type" : "application/json" },
      }
    );

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({        
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ]);
    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }
    return getErrorResponse(500, error.message);
  }
}
