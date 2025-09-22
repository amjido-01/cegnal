import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

// Protected routes
const protectedPatterns = [
  "/dashboard",
  "/chat",
  "/payment",
  "/zone",
  "/trader",
  "/update-password",
];

// Public routes that should be hidden for authenticated users
const authPages = ["/signin", 
  "/signup",
 ];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedPatterns.some(
    (pattern) => path === pattern || path.startsWith(`${pattern}/`)
  );

  const isAuthPage = authPages.includes(path);

  const auth = await cookies();
  const token = auth.get("accessToken")?.value;

  if (!token) {
    // No token → if trying to access protected route, kick to signin
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }
    // No token but on public page → allow
    return NextResponse.next();
  }

  try {
    // Verify token
    const verified = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET as string)
    );

    // ✅ Log decoded payload
    console.log("Verified JWT payload:", verified.payload);

    // If user is on signin/signup but already logged in → redirect to dashboard
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    // Token valid → continue
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);

    // Invalid/expired token → clear cookie + redirect to signin
    const res = NextResponse.redirect(new URL("/signin", req.nextUrl));
    res.cookies.delete("accessToken");
    return res;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
