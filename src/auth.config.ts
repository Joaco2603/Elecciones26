import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');

            // Allow access to login page
            if (nextUrl.pathname.startsWith('/admin/login')) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/admin/dashboard', nextUrl));
                }
                return true;
            }

            if (isOnAdmin) {
                if (isLoggedIn) {
                    const user = auth.user as any;
                    if (user.role === 'admin') return true;
                    return false; // Redirect standard users to signin (or custom 403)
                }
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role as string
            }
            return session
        },
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
