import { signIn } from "./actions";
import { Lock, Mail } from "lucide-react";

export default async function LoginPage(props: {
    searchParams: Promise<{ error?: string }>;
}) {
    const searchParams = await props.searchParams;
    const error = searchParams.error;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)/0.05,_transparent)]">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/5 text-primary mb-4">
                        <Lock className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Bienvenido</h1>
                    <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
                </div>

                <form action={signIn} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nombre@ejemplo.com"
                                    required
                                    className="flex h-12 w-full rounded-xl border border-input bg-transparent px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-primary/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="flex h-12 w-full rounded-xl border border-input bg-transparent px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-primary/50"
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm font-medium animate-in zoom-in-95 duration-300">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full h-12 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-primary/20"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <p className="text-center text-xs text-muted-foreground">
                    Elecciones 26 &bull; Plataforma Segura
                </p>
            </div>
        </div>
    );
}
