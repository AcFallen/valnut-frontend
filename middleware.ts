import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // Protect /tenants route - only system_admin can access
    if (pathname.startsWith("/tenants")) {
      if (token?.userType !== "system_admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    // Protect /settings route - only tenant_owner can access
    if (pathname.startsWith("/settings")) {
      if (token?.userType !== "tenant_owner") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    // Dashboard routes are accessible to all authenticated users
    if (pathname.startsWith("/dashboard")) {
      const allowedUserTypes = ["system_admin", "tenant_owner", "tenant_user"]
      if (!token?.userType || !allowedUserTypes.includes(token.userType as string)) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/(dashboard)/:path*",
    "/tenants/:path*",
    "/settings/:path*"
  ]
}