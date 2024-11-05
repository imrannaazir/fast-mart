/**
 * The root route url
 * @type {string}
 */

export const ROOT_ROUTE = "/";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * An array of routes those are not accessible to the public
 * These routes require authentication
 * @types {string[]}
 */
export const privateRoutes = ["/cart", "/wishlist", "/checkout", "/order-success"];

/**
 * The prefix for api authentication routes
 * Routes that start with this prefix are used for API authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * An array of routes those are used for authentication
 * These routes will redirect logged in users to default routes
 * @types {string[]}
 */
export const authRoutes = ["/login", "/register"];
