"use client";

import { useFormContext } from "react-hook-form";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    icon?: LucideIcon;
}

export function FormInput({ name, label, icon: Icon, className, ...props }: FormInputProps) {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name]?.message as string | undefined;

    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                )}
                <input
                    id={name}
                    {...register(name)}
                    {...props}
                    className={cn(
                        "flex h-12 w-full rounded-xl border border-input bg-transparent px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-primary/50",
                        Icon ? "pl-10" : "pl-3",
                        error && "border-destructive focus-visible:ring-destructive",
                        className
                    )}
                />
            </div>
            {error && (
                <p className="text-sm font-medium text-destructive animate-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
}
