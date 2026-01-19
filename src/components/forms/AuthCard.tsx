import Link from "next/link";

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    description: string;
    icon?: React.ReactNode;
    footerText?: string;
}

export function AuthCard({ children, title, description, icon, footerText }: AuthCardProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)/0.05,_transparent)]">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="text-center space-y-2">
                    {icon && (
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/5 text-primary mb-4">
                            {icon}
                        </div>
                    )}
                    <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>

                {children}

                {footerText && (
                    <p className="text-center text-xs text-muted-foreground">
                        {footerText}
                    </p>
                )}
            </div>
        </div>
    );
}
