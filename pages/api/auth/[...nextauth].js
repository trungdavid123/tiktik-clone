import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: "118858091445-70a72j7e4ntgsu0qmircf5gt5sujm013.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
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