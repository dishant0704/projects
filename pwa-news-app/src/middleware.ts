// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value;
  const isLoggedIn = request.cookies.get("authjs.session-token")?.value;

  if((isPublicPath && token) || (isPublicPath && isLoggedIn)){
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // if((!isPublicPath && !token) || (!isPublicPath && !isLoggedIn)){
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/signup',
    '/verifyemail',
    '/login',
    '/dashboard',
  ],
}
