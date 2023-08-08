import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";
import { getErrorResponse } from "./lib/helpers";

interface AuthenticatedRequest extends NextRequest {
    user: {
        id : string;
    };
}

let redirectToLogin = false;
export async function middleware(req:NextRequest) {
    let token: string | undefined;
    if (req.cookies.has("token")) {
        token = req.cookies.get("token")?.value;
    } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
        token = req.headers.get("Authorization")?.substring(7);
    }

    if (req.nextUrl.pathname.startsWith("/Login") && (!token || redirectToLogin))
    return;

    if (
        !token && 
        (req.nextUrl.pathname.startsWith("api/isers")) || 
        (req.nextUrl.pathname.startsWith("api/auth/logout"))
        ) {
            return getErrorResponse(401, "ERROR: You are not logged in. Please login to access this page");
        }
        const response = NextResponse.next();

        try {
            if (token) {
                const { sub } = await verifyJWT<{ sub: string}>(token);
                response.headers.set("X-USER-ID", sub);
                (req as AuthenticatedRequest).user = {id: sub};
            }
        } catch (error) {
            redirectToLogin = true;
            if (req.nextUrl.pathname.startsWith("/api")) {
                return getErrorResponse(401, "ERROR: Invalid credentials or account doesn't exists");
            }

            return NextResponse.redirect(
                new URL(`/Login?${new URLSearchParams({error: "badauth"})}`, req.url)
            );
        }

        const authUser = (req as AuthenticatedRequest).user;
        if (!authUser) {
            return NextResponse.redirect(
                new URL(`/Login?${new URLSearchParams({
                    error: "badauth",
                    forceLogin: "true",
                })}`, req.url)
            );
        }

        if (req.url.includes("/Login") && authUser) {
            return NextResponse.redirect(new URL("/Profile", req.url));
        }
        return response;
}

export const config = {
    matcher : ["/Profile", "/Login", "/api/users/:path*", "/api/auth/logout"],
};