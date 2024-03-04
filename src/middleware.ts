import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticationPath = path === "/login" || path === "/register";
  const tokenValue = request.cookies.get("token")?.value || "";
  console.log(`Path: ${path}. Authentication Path: ${isAuthenticationPath}`);
  console.log(`Token Value: ${tokenValue}`);
  // if (path === "/login" || path === "/register") {
  //   console.log(`[Login / Register]Path: ${path}`);
  // } else {
  //   console.log(`Not Authentication Path. ${path}`);
  // }
  // if (isAuthenticationPath && tokenValue) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // } else if (!isAuthenticationPath && !tokenValue) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
  // if (!isAuthenticationPath && !tokenValue) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // } else if (isAuthenticationPath && tokenValue) {
  //   // Allow access to login and register for authenticated users
  //   return NextResponse.next();
  // } else if (tokenValue) {
  //   // Redirect authenticated users to profile (replace with your desired page)
  //   return NextResponse.redirect(new URL("/profile", request.nextUrl));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/register"],
};
