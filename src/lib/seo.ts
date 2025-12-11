import { Metadata } from "next"
import { env } from "@/config/env"
import pricingConfig from "@/config/pricing-config.json"

interface MetadataProps {
    title: string
    description?: string
    image?: string
    icons?: string
    noIndex?: boolean
}

export function constructMetadata({
    title,
    description = `The best way to use ${pricingConfig.appName}`,
    image = "/og-image.png",
    icons = "/favicon.ico",
    noIndex = false,
}: MetadataProps): Metadata {
    return {
        title: {
            default: title,
            template: `%s | ${pricingConfig.appName}`,
        },
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@bartlabs",
        },
        icons,
        metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    }
}
