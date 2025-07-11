import { NextResponse, NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const isLoggedIn = !!token;

  // console.log("isLoggedIn : ", isLoggedIn);
  // console.log("token : ", token);

  const protectedPaths = ["/dashboard", "/dashboard/audit"];
  const authPages = ["/login", "/register"];

  const isProtectedRoute = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  const isAuthPage = authPages.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  if (!isLoggedIn && isProtectedRoute) {
    const redirectUrl = new URL("/login", req.nextUrl.origin);
    redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoggedIn) {
    try {
      const response = NextResponse.next();
      if (token) {
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-auth-token", token);
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }

      return response;
    } catch (error) {
      console.error("Invalid token:", error);
      const response = NextResponse.redirect(
        new URL("/login", req.nextUrl.origin)
      );
      response.cookies.delete("jwt");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
