'use client'

import { Button } from '@/components/ui/button'
import { FileText, Mail } from 'lucide-react'
import Link from 'next/link'
export default function FloatingButtons({
	isAboutVisible,
}: {
	isAboutVisible: boolean
}) {
	return (
		<div
			className={`fixed z-50 flex space-x-2 ${
				isAboutVisible
					? 'top-4 right-4'
					: 'bg-secondary/50 border-border bottom-48 left-1/2 -translate-x-1/2 rounded-full border p-4 backdrop-blur-sm'
			}`}
		>
			<Link
				href="https://drive.google.com/file/d/1BT1yYVTMimJOUFHBXF3dzm9Jf02hMGSV/view?usp=sharing"
				passHref
			>
				<Button
					variant="default"
					size="default"
					className={`inline-flex cursor-pointer items-center rounded-full px-8 py-4 transition-all duration-500 ease-in-out ${
						isAboutVisible
							? 'bg-blue-600 text-white hover:bg-blue-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-600'
							: 'bg-white text-blue-600 hover:bg-white hover:text-blue-600 hover:ring-2 hover:ring-blue-500 dark:bg-secondary dark:text-blue-400 dark:hover:bg-secondary/80 dark:hover:text-blue-400 dark:hover:ring-2 dark:hover:ring-blue-400'
					}`}
				>
					<FileText className={`mr-2 h-7 w-7 ${isAboutVisible ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
					<span>Resume</span>
				</Button>
			</Link>
			<Link href="/contact">
				<Button
					variant="default"
					size="default"
					className={`inline-flex cursor-pointer items-center rounded-full px-8 py-4 transition-all duration-500 ease-in-out ${
						isAboutVisible
							? 'bg-green-600 text-white hover:bg-green-600 dark:bg-green-600 dark:text-white dark:hover:bg-green-600'
							: 'bg-white text-green-600 hover:bg-white hover:text-green-600 hover:ring-2 hover:ring-green-500 dark:bg-secondary dark:text-green-400 dark:hover:bg-secondary/80 dark:hover:text-green-400 dark:hover:ring-2 dark:hover:ring-green-400'
					}`}
				>
					<Mail className={`mr-2 h-7 w-7 ${isAboutVisible ? 'text-white' : 'text-green-600 dark:text-green-400'}`} />
					<span>Contact</span>
				</Button>
			</Link>
		</div>
	)
}
