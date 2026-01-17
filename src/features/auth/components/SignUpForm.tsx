'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { signupAction } from '../actions/signup'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

const formSchema = z.object({
    email: z.string().min(1, 'Email es obligatorio').email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Mínimo 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
})

type FormData = z.infer<typeof formSchema>

export default function SignUpForm() {
    const [serverError, setServerError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(data: FormData) {
        setIsPending(true)
        setServerError(null)

        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('confirmPassword', data.confirmPassword)

        try {
            const result = await signupAction(formData)

            if (result && typeof result === 'object' && 'error' in result) {
                if (typeof result.error === 'string') {
                    setServerError(result.error)
                } else {
                    // Handle field errors if returned as object (simplified for now to generic or first error)
                    setServerError('Error en el formulario. Por favor verifica los datos.')
                }
            }
        } catch (error) {
            // Redirect throws error in server actions, but we catch it here? 
            // Next.js redirect throws an error, so usually we should let it bubble up or handle specifically.
            // But if specific error string returned, we handle it.
            // If valid redirect, it might not reach here if component unmounts.
        } finally {
            setIsPending(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm mx-auto p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Registro</h2>

            {serverError && (
                <div role="alert" className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {serverError}
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    {...register('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                    <p id="email-error" className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Contraseña</label>
                <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    {...register('password')}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                />
                {errors.password && (
                    <p id="password-error" className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirmar Contraseña</label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="******"
                    {...register('confirmPassword')}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                />
                {errors.confirmPassword && (
                    <p id="confirm-password-error" className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                {isPending ? 'Registrando...' : 'Registrarse'}
            </Button>

            <div className="text-center mt-4 text-sm">
                ¿Ya tienes cuenta?{' '}
                <Link href="/admin/login" className="text-blue-600 hover:underline">
                    Inicia Sesión
                </Link>
            </div>
        </form>
    )
}
