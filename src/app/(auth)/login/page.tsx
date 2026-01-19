import { AuthCard } from "@/components/forms/AuthCard";
import { LoginForm } from "@/components/forms/LoginForm";
import { Lock } from "lucide-react";

export default function LoginPage() {
    return (
        <AuthCard
            title="Bienvenido"
            description="Ingresa tus credenciales para continuar"
            footerText="Elecciones 26 &bull; Plataforma Segura"
            icon={<Lock className="w-10 h-10" />}
        >
            <LoginForm />
        </AuthCard>
    );
}
