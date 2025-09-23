import { nextAuthConfig } from "@/next-auth/nextAuth.config";
import NextAuth from "next-auth";

const nextAuthObject = NextAuth(nextAuthConfig);

export { nextAuthObject as GET , nextAuthObject as POST };
