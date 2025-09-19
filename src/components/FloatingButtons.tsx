'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FileText, Mail } from 'lucide-react'
import Link from 'next/link'

export default function FloatingButtons({
	isAboutVisible,
	mode = 'flow',
}: {
	isAboutVisible: boolean
	mode?: 'flow' | 'header'
}) {
	return (
		<div
			className={`z-50 flex space-x-4 transition-all duration-500 ease-in-out ${
				mode === 'header'
					? ''
					: 'glass-effect relative mx-auto mt-12 rounded-2xl border p-6 shadow-2xl'
			}`}
		>
			<motion.div
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
			>
				<Button
					asChild
					variant="default"
					size="lg"
					className={`btn-premium relative overflow-hidden rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 ${
						isAboutVisible
							? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
							: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-purple-500/25'
					}`}
				>
					<Link href="/resume.pdf" rel="noopener noreferrer" target="_blank">
						<FileText className="mr-3 h-6 w-6" />
						<span>Resume</span>
					</Link>
				</Button>
			</motion.div>
			<motion.div
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
			>
				<Button
					asChild
					variant="default"
					size="lg"
					className={`btn-premium relative overflow-hidden rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 ${
						isAboutVisible
							? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-green-500/25'
							: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25'
					}`}
				>
					<Link href="/contact">
						<Mail className="mr-3 h-6 w-6" />
						<span>Contact</span>
					</Link>
				</Button>
			</motion.div>
		</div>
	)
}

				asChild
				variant="default"
				size="default"
				className={`inline-flex cursor-pointer items-center rounded-full px-8 py-4 transition-all duration-500 ease-in-out ${
					isAboutVisible
						? 'bg-blue-600 text-white hover:bg-blue-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-600'
						: 'dark:bg-secondary dark:hover:bg-secondary/80 bg-white text-blue-600 hover:bg-white hover:text-blue-600 hover:ring-2 hover:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-400 dark:hover:ring-2 dark:hover:ring-blue-400'
				}`}
			>
				<Link href="/resume.pdf" rel="noopener noreferrer" target="_blank">
					<FileText
						className={`mr-2 h-7 w-7 ${isAboutVisible ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}
					/>
					<span>Resume</span>
				</Link>
			</Button>
			<Button
				asChild
				variant="default"
				size="default"
				className={`inline-flex cursor-pointer items-center rounded-full px-8 py-4 transition-all duration-500 ease-in-out ${
					isAboutVisible
						? 'bg-green-600 text-white hover:bg-green-600 dark:bg-green-600 dark:text-white dark:hover:bg-green-600'
						: 'dark:bg-secondary dark:hover:bg-secondary/80 bg-white text-green-600 hover:bg-white hover:text-green-600 hover:ring-2 hover:ring-green-500 dark:text-green-400 dark:hover:text-green-400 dark:hover:ring-2 dark:hover:ring-green-400'
				}`}
			>
				<Link href="/contact">
					<Mail
						className={`mr-2 h-7 w-7 ${isAboutVisible ? 'text-white' : 'text-green-600 dark:text-green-400'}`}
					/>
					<span>Contact</span>
				</Link>
			</Button>
		</div>
	)
}
