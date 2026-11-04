import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge reads border-brand as a border width unless it knows the token.
const twMerge = extendTailwindMerge({
	extend: {
		theme: {
			color: [
				'brand',
				'brand-hover',
				'brand-glow',
				'linkedin',
				'resume',
				'role',
			],
		},
	},
})

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
