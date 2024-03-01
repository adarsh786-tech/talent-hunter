import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticationPath = path === "/login" || path === "/register";
  const tokenValue = request.cookies.get("token")?.value || "";
  console.log(`Path: ${path}. Authentication Path: ${isAuthenticationPath}`);
  console.log(`Token Value: ${tokenValue}`);

  // if (isAuthenticationPath && tokenValue) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // } else if (!isAuthenticationPath && !tokenValue) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
  if (!isAuthenticationPath && !tokenValue) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  } else if (isAuthenticationPath && tokenValue) {
    // Allow access to login and register for authenticated users
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/register"],
};
