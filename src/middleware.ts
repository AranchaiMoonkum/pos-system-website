import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

const middleware = async (req: NextRequest) => {
    const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const { pathname } = req.nextUrl

    const publicPaths = ["/sign-in", "/sign-up"]

    if (!user) {
        // Redirect to sign-in if user is not signed in
        if (!publicPaths.includes(pathname)) { return NextResponse.redirect(new URL("/sign-in", req.url)) }
    } else {
        // Redirect to overview if user is signed in
        if (publicPaths.includes(pathname)) { return NextResponse.redirect(new URL("/overview", req.url)) }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next|favicon.ico).*)"], // exclude API routes, next.js internals, and assets
};

export default middleware
