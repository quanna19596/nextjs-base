import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import http from "@/services/http";
import login, { TLoginResponseFailed, TLoginResponseSuccess } from "@/services/sample/auth/login";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const loginRequest = {
          paths: {},
          queries: {},
          body: {
            username: credentials.username,
            password: credentials.password,
          },
        };

        const { data, error } = await http.request<TLoginResponseSuccess, TLoginResponseFailed>(
          login(loginRequest),
        );

        if (!data || error) return null;

        return {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          image: data.image,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        return {
          ...token,
          id: user?.id || "",
          username: user?.username || "",
          email: user?.email || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          gender: user?.gender || "",
          image: user?.image || "",
          accessToken: user?.accessToken || "",
          refreshToken: user?.refreshToken || "",
        };
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        id: token?.id || "",
        username: token?.username || "",
        email: token?.email || "",
        firstName: token?.firstName || "",
        lastName: token?.lastName || "",
        gender: token?.gender || "",
        image: token?.image || "",
        accessToken: token?.accessToken || "",
        refreshToken: token?.refreshToken || "",
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/vi/login",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.DOMAIN,
      },
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
