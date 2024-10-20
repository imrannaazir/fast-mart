import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, privateRoutes, ROOT_ROUTE } from "./routes";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // get token
  const token = await getToken({ req: request });

  // check token validation
  const isTokensValid = !!token && !!token?.accessToken && !!token.refreshToken && Date.now() < token.refreshExpiresAt;

  //check is api auth route
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // check is privet route
  const isPrivetRoute = privateRoutes.includes(nextUrl.pathname);

  // check is auth route
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  console.log(isAuthRoute);

  if (nextUrl.pathname === ROOT_ROUTE) {
    return null;
  }

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isTokensValid) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (isPrivetRoute) {
    if (!isTokensValid) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callback", request.url);
      return Response.redirect(url);
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
