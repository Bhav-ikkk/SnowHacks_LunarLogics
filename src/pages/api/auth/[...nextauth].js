import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const users = await db.any(
          'SELECT id, name, email, password, role FROM users WHERE email = $1',
          [credentials.email]
        );

        if (users.length === 0) {
          throw new Error('Invalid email or password');
        }

        const user = users[0];

        // Check if user signed up with OAuth (no password)
        if (!user.password) {
          throw new Error('Please sign in with Google');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUsers = await db.any(
            'SELECT id, name, email, role, provider FROM users WHERE email = $1',
            [user.email]
          );

          if (existingUsers.length === 0) {
            // Create new user for Google sign-in
            const result = await db.one(
              `INSERT INTO users (name, email, password, role, provider, provider_id) 
               VALUES ($1, $2, $3, $4, $5, $6) 
               RETURNING id, name, email, role`,
              [user.name, user.email, null, 'user', 'google', account.providerAccountId]
            );
            user.id = result.id;
            user.role = result.role;
          } else {
            // User exists, update provider info if needed
            const existingUser = existingUsers[0];
            if (!existingUser.provider) {
              await db.none(
                'UPDATE users SET provider = $1, provider_id = $2 WHERE email = $3',
                ['google', account.providerAccountId, user.email]
              );
            }
            user.id = existingUser.id;
            user.role = existingUser.role;
          }
          return true;
        } catch (error) {
          console.error('Error during Google sign-in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
