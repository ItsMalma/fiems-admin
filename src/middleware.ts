import { NextRequest, NextResponse } from "next/server";
import { verify } from "./libs/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const record = await verify(token.value);
  if (!record) return NextResponse.redirect(new URL("/login", req.url));

  const url = req.nextUrl.clone();
  if (url.pathname === "/") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!api|login|_next/static|_next/image|favicon.ico).*)"],
};
