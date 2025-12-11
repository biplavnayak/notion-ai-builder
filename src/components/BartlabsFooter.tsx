import Link from "next/link"
import { cn } from "@/lib/utils"

interface BartlabsFooterProps {
    className?: string
    socials?: {
        twitter?: string
        linkedin?: string
        github?: string
        instagram?: string
    }
}

export function BartlabsFooter({ className, socials }: BartlabsFooterProps) {
    return (
        <footer className={cn("border-t py-6 md:py-0", className)}>
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <a
                            href="https://www.bartlabs.in"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            Bartlabs
                        </a>
                        . The source code is available on{" "}
                        <a
                            href="https://github.com/bartlabs"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </div>

                {socials && (
                    <div className="flex items-center gap-4">
                        {socials.twitter && (
                            <Link href={socials.twitter} target="_blank" rel="noreferrer">
                                <span className="sr-only">Twitter</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-muted-foreground hover:text-foreground"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5 4.5 1.2 8.3-2.3 8.3-2.3.4-1.8 1.8-2.3 1.8-2.3-.4-1.8-.4-3.6 1.3-4.8-1.5-.2-2.3.6-2.3.6z" />
                                </svg>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </footer>
    )
}
