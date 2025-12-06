// api/auth/[..nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const admin = await Admin.findOne({ username: credentials.username });
        if (!admin) throw new Error("Admin not found");

        const isValid = await bcrypt.compare(credentials.password, admin.password);
        if (!isValid) throw new Error("Invalid credentials");

        return { id: admin._id, username: admin.username, role: "admin" };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "admin";
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login", // Custom admin login page
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
