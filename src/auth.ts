import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcrypt"
import { createClient } from "@/utils/supabase/server"
import { authConfig } from "./auth.config"

async function getUser(email: string) {
    const supabase = await createClient()
    try {
        console.log("Fetching user...")
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("mail", email)
            .single()

        if (error) {
            console.error("Failed to fetch user:", error)
            return null
        }

        // Map database fields to Auth.js expected fields
        return {
            ...data,
            email: data.mail,
            role: data.role, // Ensure role is mapped
        }
    } catch (error) {
        console.error("Failed to fetch user:", error)
        return null
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    console.log("Attempting login for:", email);
                    const user = await getUser(email);
                    if (!user) {
                        console.log("User not found.");
                        return null;
                    }

                    console.log("User found. ID:", user.id);
                    // console.log("Stored Password Hash:", user.password); // Don't log hash

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    console.log("Password match result:", passwordsMatch);

                    if (passwordsMatch) {
                        return {
                            id: user.id,
                            email: user.email,
                            role: user.role
                        };
                    } else {
                        console.log("Passwords did not match.");
                    }
                }

                return null;
            },
        }),
    ],
})
