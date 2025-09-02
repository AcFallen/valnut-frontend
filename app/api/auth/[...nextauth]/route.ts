import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverApi } from "@/lib/axios";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        try {
          const response = await serverApi.post('/auth/login', {
            username: credentials.username,
            password: credentials.password,
          });

          if (response.data.success && response.data.data) {
            const { access_token, user } = response.data.data;
            
            return {
              id: user.id,
              email: user.profile.email,
              name: `${user.profile.firstName} ${user.profile.lastName}`,
              username: user.username,
              userType: user.userType,
              tenantId: user.tenantId,
              profile: user.profile,
              accessToken: access_token,
            };
          }
          
          return null;
        } catch (error: any) {
          console.error("Login error:", error);
          throw new Error(error.response?.data?.message || "Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
        token.userType = user.userType;
        token.tenantId = user.tenantId;
        token.profile = user.profile;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = {
        ...session.user,
        id: token.sub as string,
        username: token.username as string,
        userType: token.userType as string,
        tenantId: token.tenantId as string,
        profile: token.profile as any,
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };