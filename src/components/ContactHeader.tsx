'use client'

import FloatingButtons from '@/components/FloatingButtons'

export default function ContactHeader() {
    return (
        <div
            className="fixed right-4 z-50"
            style={{ top: 'calc(env(safe-area-inset-top) + 14px)' }}
        >
            <FloatingButtons isAboutVisible={true} mode="header" />
        </div>
    )
}
