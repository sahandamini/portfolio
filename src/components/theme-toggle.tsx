'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Map theme to an index for stable percent-based translation
    const activeIndex = useMemo(() => {
        switch (theme) {
            case 'system':
                return 0
            case 'dark':
                return 1
            case 'light':
                return 2
            default:
                return 0
        }
    }, [theme])

    const transform = `translateX(${activeIndex * 100}%)`

    return (
        <div className="relative inline-flex h-fit w-fit flex-shrink-0 items-center rounded-full bg-neutral-100 p-1 dark:bg-gray-800 overflow-hidden">
            <div
                className={`absolute left-1 top-1 h-9 w-9 rounded-full bg-purple-700 dark:bg-purple-700 will-change-transform ${
                    mounted ? 'transition-transform duration-300 ease-in-out' : 'transition-none'
                }`}
                style={{ transform }}
            />
			<Button
				variant="ghost"
				size="icon"
				className="relative z-10 rounded-full hover:bg-transparent dark:hover:bg-transparent"
				onClick={() => setTheme('system')}
			>
				<Monitor
					className={cn(
						'h-[1.2rem] w-[1.2rem]',
						// Make selected icon white (independent of resolved theme)
						theme === 'system' && 'text-white',
					)}
				/>
				<span className="sr-only">System theme</span>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="relative z-10 rounded-full hover:bg-transparent dark:hover:bg-transparent"
				onClick={() => setTheme('dark')}
			>
				<Moon
					className={cn(
						'h-[1.2rem] w-[1.2rem]',
						theme === 'dark' && 'text-white',
					)}
				/>
				<span className="sr-only">Dark theme</span>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="relative z-10 rounded-full hover:bg-transparent dark:hover:bg-transparent"
				onClick={() => setTheme('light')}
			>
				<Sun
					className={cn(
						'h-[1.2rem] w-[1.2rem]',
						theme === 'light' && 'text-white',
					)}
				/>
				<span className="sr-only">Light theme</span>
			</Button>
		</div>
	)
}
