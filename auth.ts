import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//     providers: [GitHub],
//     callbacks: {
//         async signIn({
//                          user: { name, email, image },
//                          profile: { id, login, bio },
//                      }) {
//             const existingUser = await client
//                 .withConfig({ useCdn: false })
//                 .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
//                     id,
//                 });
//
//             if (!existingUser) {
//                 await writeClient.create({
//                     _type: "author",
//                     id,
//                     name,
//                     username: login,
//                     email,
//                     image,
//                     bio: bio || "",
//                 });
//             }
//
//             return true;
//         },
//         async jwt({ token, account, profile }) {
//             if (account && profile) {
//                 const user = await client
//                     .withConfig({ useCdn: false })
//                     .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
//                         id: profile?.id,
//                     });
//
//                 token.id = user?._id;
//             }
//
//             return token;
//         },
//         async session({ session, token }) {
//             Object.assign(session, { id: token.id });
//             return session;
//         },
//     },
// });

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({
                         user: { name, email, image },
                         profile: { id, login, bio },
                     }) {
            const existingUser = await client
                .withConfig({ useCdn: false })
                .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                    id,
                });

            if (!existingUser) {
                await writeClient.create({
                    _type: "author",
                    id,
                    name,
                    username: login,
                    email,
                    image,
                    bio: bio || "",
                });
            }

            return true;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const id = profile?.id; // GitHub ID

                try {
                    // Fetch user from Sanity based on the GitHub ID
                    const user = await client
                        .withConfig({ useCdn: false })
                        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

                    if (user) {
                        token.id = user._id; // Assign Sanity user ID to token
                    }
                } catch (error) {
                    // Handle any errors
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token.id) {
                session.id = token.id; // Only assign if token.id is defined
            }
            return session;
        },

    },
});
