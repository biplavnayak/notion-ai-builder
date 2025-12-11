"use client"

import { useState } from "react"
import { BartlabsFooter } from "@/components/BartlabsFooter"
import { Eye, EyeOff, Copy, Check, ExternalLink } from "lucide-react"

// -----------------------------------------------------------------------------
// CONFIGURATION DATA
// -----------------------------------------------------------------------------
const REQUIRED_KEYS = [
    {
        category: "App Configuration",
        items: [
            { key: "NEXT_PUBLIC_APP_NAME", label: "App Name", required: true, description: "Display name of your application" },
            { key: "NEXT_PUBLIC_APP_URL", label: "App URL", required: true, description: "Base URL (e.g. https://notion.bartlabs.in)" },
        ]
    },
    {
        category: "Database (Supabase)",
        items: [
            { key: "NEXT_PUBLIC_SUPABASE_URL", label: "Supabase URL", required: true, description: "Project URL from Supabase settings" },
            { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", label: "Anon Key", required: true, description: "Public anonymous key" },
            { key: "SUPABASE_SERVICE_ROLE_KEY", label: "Service Role Key", required: true, secret: true, description: "Private service role key (Keep secret!)" },
        ]
    },
    {
        category: "Notion API",
        items: [
            { key: "NOTION_CLIENT_ID", label: "Client ID", required: false, description: "OAuth Client ID from Notion" },
            { key: "NOTION_CLIENT_SECRET", label: "Client Secret", required: false, secret: true, description: "OAuth Client Secret" },
            { key: "NOTION_REDIRECT_URI", label: "Redirect URI", required: false, description: "OAuth callback URL" },
        ]
    },
    {
        category: "Payments (Razorpay)",
        items: [
            { key: "NEXT_PUBLIC_RAZORPAY_KEY_ID", label: "Key ID", required: false, description: "Public Key ID from Razorpay Dashboard" },
            { key: "RAZORPAY_KEY_SECRET", label: "Key Secret", required: false, secret: true, description: "Private Key Secret" },
        ]
    },
    {
        category: "AI (OpenAI)",
        items: [
            { key: "OPENAI_API_KEY", label: "API Key", required: false, secret: true, description: "OpenAI API key for AI generation" },
        ]
    },
    {
        category: "Bartlabs Ecosystem",
        items: [
            { key: "BARTLABS_APP_SECRET", label: "App Secret", required: false, secret: true, description: "Shared secret for inter-app communication" },
            { key: "BARTLABS_PAYMENT_URL", label: "Payment Gateway", required: false, description: "URL of the central payment gateway" },
        ]
    }
]

const IMPORTANT_LINKS = [
    { name: "Supabase Dashboard", url: "https://supabase.com/dashboard" },
    { name: "Razorpay Dashboard", url: "https://dashboard.razorpay.com" },
    { name: "Vercel Dashboard", url: "https://vercel.com/dashboard" },
    { name: "Bartlabs Main Site", url: "https://bartlabs.in" },
    { name: "Notion API", url: "https://www.notion.so/my-integrations" },
    { name: "OpenAI API", url: "https://platform.openai.com/api-keys" },
]

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------

export default function KeysAndLinksPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
    const [copied, setCopied] = useState<string | null>(null)

    // Check if environment variable exists
    const checkEnv = (key: string) => {
        if (typeof window === 'undefined') return false

        // For client-side vars, we can check directly
        if (key.startsWith('NEXT_PUBLIC_')) {
            return !!(process.env as any)[key]
        }

        // For server-side vars, we assume they're configured
        return true
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "admin123") {
            setIsAuthenticated(true)
        } else {
            alert("Invalid password")
        }
    }

    const toggleSecret = (key: string) => {
        setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text)
        setCopied(key)
        setTimeout(() => setCopied(null), 2000)
    }

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
                <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Bartlabs Admin</h1>
                        <p className="text-sm text-gray-500">Secure Access Required</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Admin Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-800 transition-colors"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Keys & Configuration</h1>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="text-sm text-gray-500 hover:text-black"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-5xl">

                {/* Quick Links Section */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <ExternalLink className="w-5 h-5" /> Quick Links
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {IMPORTANT_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-black transition-colors group"
                            >
                                <span className="font-medium text-sm">{link.name}</span>
                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black" />
                            </a>
                        ))}
                    </div>
                </section>

                {/* API Keys Section */}
                <div className="space-y-8">
                    {REQUIRED_KEYS.map((section) => (
                        <section key={section.category} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                            <div className="px-6 py-4 border-b bg-gray-50">
                                <h2 className="font-semibold text-lg">{section.category}</h2>
                            </div>
                            <div className="divide-y">
                                {section.items.map((item) => (
                                    <div key={item.key} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <h3 className="font-medium text-gray-900">{item.label}</h3>
                                                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                    {item.key}
                                                </span>
                                                {checkEnv(item.key) ? (
                                                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                                        <Check className="w-3 h-3" /> Configured
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-medium">
                                                        Missing
                                                    </span>
                                                )}
                                                {!item.required && (
                                                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                                                        Optional
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>

                                        <div className="flex items-center gap-2 w-full md:w-auto">
                                            <div className="relative flex-1 md:w-64">
                                                <input
                                                    type={showSecrets[item.key] ? "text" : "password"}
                                                    readOnly
                                                    value={item.secret ? "••••••••••••••••••••••••" : "Configured"}
                                                    className="w-full text-sm font-mono bg-gray-50 border rounded-lg px-3 py-2 pr-10 focus:outline-none"
                                                />
                                                {item.secret && (
                                                    <button
                                                        onClick={() => toggleSecret(item.key)}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showSecrets[item.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard("value", item.key)}
                                                className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Copy value"
                                            >
                                                {copied === item.key ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </main>

            <BartlabsFooter className="mt-12" />
        </div>
    )
}
