import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Her matcher vi KUN det, der skal beskyttes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)", // beskyt dashboard og alt under
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // Kun disse kræver login
  }
});

export const config = {
  matcher: [
    // Undgå Next.js internfiler og statiske assets
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Inkluder API-ruter
    "/(api|trpc)(.*)",
  ],
};
