'use server'

import { z } from 'zod'
import bcrypt from 'bcrypt'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const signupSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Mínimo 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
})

export async function signupAction(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries())
    const validatedFields = signupSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { email, password } = validatedFields.data

    const supabase = await createClient()

    // Check if user exists
    const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('mail', email)
        .single()

    if (existingUser) {
        return { error: 'El usuario ya existe' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert user
    const { error: insertError } = await supabase
        .from('users')
        .insert({
            mail: email,
            password: hashedPassword,
            role: 'user', // Default role
        })

    if (insertError) {
        console.error('Signup error:', insertError)
        return { error: 'Error al registrar el usuario' }
    }

    // Redirect to login (or login automatically - for now redirect)
    redirect('/admin/login?signup=success')
}
