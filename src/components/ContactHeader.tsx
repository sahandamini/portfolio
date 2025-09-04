'use client'

import FloatingButtons from '@/components/FloatingButtons'
import ClientThemeToggle from '@/components/client-theme-toggle'

export default function ContactHeader() {
    return (
        <div
            className="fixed inset-x-0 z-50"
            style={{ top: 'calc(env(safe-area-inset-top) + 14px)' }}
        >
            <div className="flex items-center justify-between px-4">
                <div className="pointer-events-auto flex items-center gap-2">
                    <ClientThemeToggle />
                </div>
                <div className="pointer-events-auto">
                    <FloatingButtons isAboutVisible={true} mode="header" />
                </div>
            </div>
        </div>
    )
}
