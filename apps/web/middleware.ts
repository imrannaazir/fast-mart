import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, privateRoutes, ROOT_ROUTE } from "@/constants/routes";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  // get token
  const token = await getToken({ req: req as Request as any });
  // check token payloads are valid or not
  const isValidToken = !!token?.sessionToken && token.refreshToken && new Date() < new Date(token.refreshExpiresAt);

  // check is api auth route
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // check is public route
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  // check is auth route
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (nextUrl.pathname === ROOT_ROUTE) {
    return null;
  }

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isValidToken) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (isPrivateRoute) {
    if (!isValidToken) {
      return Response.redirect(new URL("/login", nextUrl));
    }
    return null;
  }

  return null;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
