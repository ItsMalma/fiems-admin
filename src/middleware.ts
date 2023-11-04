import { NextRequest, NextResponse } from "next/server";
import { verify } from "./libs/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token || !(await verify(token.value))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|login|_next/static|_next/image|favicon.ico).*)"],
};
