import { clerkMiddleware } from '@clerk/nextjs/server'
import arcjet, { detectBot, shield, slidingWindow } from '@arcjet/next'
import { env } from './env/server'


const aj = arcjet({
  //type env vars
  key: env.ARCJET_KEY,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({   mode: 'LIVE', allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR", "CATEGORY:PREVIEW"] }),
    slidingWindow({
      mode: 'LIVE',
      interval: '1m',
      max: 100
    }),
    
  ]
})

export default clerkMiddleware(async (_auth, req) => {
  const decision = await aj.protect(req)
  if (decision.isDenied()) {
    return new Response(null, {status: 403})
  }
})



export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ]}
