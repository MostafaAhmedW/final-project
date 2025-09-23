import { NextAuthOptions, User, DefaultUser } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {jwtDecode} from 'jwt-decode';

// نوع مخصص للمستخدم بعد تسجيل الدخول
interface MyUser extends User {
  credentialsToken?: string;
}

// نوع مخصص للـ session.user لإضافة id
interface MySessionUser extends DefaultUser {
  id: string;
}

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Fresh Cart",
      credentials: {
        email: { type: "email", placeholder: "Enter your email", label: "User email" },
        password: {},
      },
      authorize: async function(credentials, req) {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });

        const finalRes = await res.json();
        console.log('finalRes auth', finalRes);

        if (finalRes.message === 'success') {
          const decodeObject = jwtDecode<{ id: string }>(finalRes.token);
          return {
            id: decodeObject.id,
            name: finalRes.user.name,
            email: finalRes.user.email,
            credentialsToken: finalRes.token,
          } as MyUser;
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    jwt({ token, user }) {
      console.log('jwt params', { token, user });

      if (user) {
        const myUser = user as MyUser;
        if (myUser.credentialsToken) {
          token.credentialsToken = myUser.credentialsToken;
        }
        token.userId = myUser.id;
      }

      return token;
    },

    session({ session, token }) {
      console.log('session params', { session, token });
      (session.user as MySessionUser).id = token.userId as string;
      return session;
    },
  },

  session: {
    maxAge: 60 * 60 * 24,
  },
};
