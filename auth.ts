import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      name: "Mock Account",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Accept any entered email and password for the demo purpose
        if (credentials?.email && credentials?.password) {
          return { 
            id: "1", 
            name: credentials.email.toString().split('@')[0], 
            email: credentials.email.toString() 
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnHistory = nextUrl.pathname.startsWith("/history");
      const isOnUpload = nextUrl.pathname.startsWith("/upload");
      
      if (isOnDashboard || isOnHistory || isOnUpload) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
});
