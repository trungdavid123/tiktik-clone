import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        }),
    ],
    secret: 'IamVery1231i3jodsjad9j9ue21pj',
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user?.id) {
                token.id = user.id
            }
            if (user?.userName) {
                token.userName = user.userName;
            }
            return token
        },
        async session({ session, token }) {
            session.id = token.id;
            session.userName = token.userName;
            return session;
        }
    }
};
export default NextAuth(authOptions);