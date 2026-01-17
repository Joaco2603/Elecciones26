'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { loginAction } from '../actions/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type FormData = z.infer<typeof formSchema>

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null)
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
        setError(null)

        // Create FormData for the server action
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)

        const result = await loginAction(formData)

        if (result?.error) {
            setError(result.error)
            setIsPending(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm mx-auto p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

            {error && (
                <div role="alert" className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {error}
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
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

            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                {isPending ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
        </form>
    )
}
