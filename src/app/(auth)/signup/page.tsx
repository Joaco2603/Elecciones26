import { AuthCard } from "@/components/forms/AuthCard";
import { SignUpForm } from "@/components/forms/SignUpForm";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
    return (
        <AuthCard
            title="Crear Cuenta"
            description="Registra tus datos para acceder a la plataforma"
            footerText="Elecciones 26 &bull; Plataforma Segura"
            icon={<UserPlus className="w-10 h-10" />}
        >
            <SignUpForm />
        </AuthCard>
    );
}
