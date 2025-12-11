"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@/lib/useUser";
import { User, LogOut, Settings, CreditCard } from "lucide-react";
import { LoginModal } from "./LoginModal";

export function UserProfile() {
    const { user, loading, supabase } = useUser();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setIsDropdownOpen(false);
    };

    if (loading) {
        return (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        );
    }

    if (!user) {
        return (
            <>
                <button
                    onClick={() => setIsLoginOpen(true)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Sign In
                </button>
                <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            </>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
                {user.avatar_url ? (
                    <img
                        src={user.avatar_url}
                        alt={user.full_name || "User"}
                        className="w-8 h-8 rounded-full border border-border"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                        <span className="text-sm font-semibold">
                            {(user.full_name || user.email || "U").charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-background rounded-xl shadow-lg border border-border py-1 animate-in fade-in zoom-in-95 duration-100 z-50">
                    <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium truncate">
                            {user.full_name || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                        </p>
                    </div>

                    <div className="py-1">
                        <button className="w-full px-4 py-2 text-sm text-left hover:bg-muted flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Profile
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-left hover:bg-muted flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Subscription
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-left hover:bg-muted flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Settings
                        </button>
                    </div>

                    <div className="border-t border-border py-1">
                        <button
                            onClick={handleSignOut}
                            className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
