import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    size?: "sm" | "md" | "lg"
    showText?: boolean
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
    const sizeClasses = {
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-12 w-12"
    }

    const textSizeClasses = {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-2xl"
    }

    return (
        <Link href="/" className={cn("flex items-center gap-2", className)}>
            <div className={cn("rounded-lg bg-black text-white flex items-center justify-center font-bold", sizeClasses[size])}>
                B
            </div>
            {showText && (
                <span className={cn("font-bold", textSizeClasses[size])}>
                    Bartlabs
                </span>
            )}
        </Link>
    )
}
