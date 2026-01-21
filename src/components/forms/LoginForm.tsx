"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "./FormInput";
import { loginAction } from "@/features/auth/actions/auth";

const loginSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const methods = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { handleSubmit, formState: { isSubmitting } } = methods;

    async function onSubmit(data: LoginFormData) {
        setServerError(null);
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        try {
            const result = await loginAction(formData);
            if (result?.error) {
                setServerError(result.error);
            }
        } catch (e) {
            setServerError("Ocurrió un error inesperado");
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormInput
                        name="email"
                        label="Correo Electrónico"
                        type="email"
                        placeholder="nombre@ejemplo.com"
                        icon={Mail}
                        autoComplete="email"
                    />

                    <FormInput
                        name="password"
                        label="Contraseña"
                        type="password"
                        icon={Lock}
                        autoComplete="current-password"
                    />
                </div>

                {serverError && (
                    <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm font-medium animate-in zoom-in-95 duration-300">
                        {serverError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
            </form>
        </FormProvider>
    );
}
