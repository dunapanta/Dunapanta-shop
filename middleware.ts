 // middleware.ts
 import { NextResponse } from 'next/server';
 import type { NextRequest } from 'next/server';
  
 import * as jose from 'jose'
  
 // This function can be marked `async` if using `await` inside
 export async function middleware(request: NextRequest) {
  
     if (request.nextUrl.pathname.startsWith('/checkout')) {
         // Getting cookies from the request
         const token = request.cookies.get('token');
         let isValidToken = false;

         try {
             await jose.jwtVerify(token || '', new TextEncoder().encode(process.env.JWT_SECRET_KEY));
             isValidToken = true;
             return NextResponse.next();
         } catch (error) {
             console.error(`JWT Invalid or not signed in`, { error });
             isValidToken = false;
         }
  
         if (!isValidToken) {
             const { pathname } = request.nextUrl;
             //logout user
              request.cookies.set('token', '', {
                  httpOnly: true,
                  maxAge: 0,
              });
             return NextResponse.redirect(
                 new URL(`/auth/login?redirect=${pathname}`, request.url)
             );
         }
     }
 }
  
 // See "Matching Paths" below to learn more
 export const config = {
     matcher: ['/checkout/:path*'],}