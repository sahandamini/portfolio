'use client'

import { Button } from '@/components/ui/button'
import ButtonNeon from '@/components/ui/neon-button'
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
			className={`z-50 transition-all duration-300 ease-in-out ${
				mode === 'header' ? '' : 'relative mx-auto mt-8 max-w-max'
			}`}
		>
			{/* Fancy outer gradient ring (only in flow mode) */}
			{mode === 'header' ? (
				<div className="flex items-center gap-2">
					{/* Resume */}
					<ButtonNeon
						asChild
						size="default"
						className="group inline-flex items-center rounded-full"
					>
						<Link href="/resume.pdf" rel="noopener noreferrer" target="_blank">
							<FileText className="mr-2 h-5 w-5 transition-all group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:text-white" />
							<span className="relative transition-colors group-hover:text-white">
								Resume
							</span>
						</Link>
					</ButtonNeon>

					{/* Contact */}
					<ButtonNeon
						asChild
						size="default"
						className="group inline-flex items-center rounded-full"
					>
						<Link href="/contact">
							<Mail className="mr-2 h-5 w-5 transition-all group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:text-white" />
							<span className="relative transition-colors group-hover:text-white">
								Contact
							</span>
						</Link>
					</ButtonNeon>
				</div>
			) : (
				<div className="border-border/70 bg-background/60 dark:bg-background/40 inline-flex items-center gap-0.5 rounded-full border px-0.5 py-0.5 shadow-xs backdrop-blur-md">
					<Button
						asChild
						variant="ghost"
						size="default"
						className={`group inline-flex items-center rounded-full bg-transparent px-4 py-2.5 font-medium transition-all hover:bg-blue-50/60 active:scale-95 dark:hover:bg-blue-500/10 ${
							isAboutVisible ? 'ring-1 ring-blue-500/20' : ''
						}`}
					>
						<Link href="/resume.pdf" rel="noopener noreferrer" target="_blank">
							<FileText
								className={`text-muted-foreground/90 mr-2 h-5 w-5 transition-all group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:text-blue-600 dark:group-hover:text-blue-400`}
							/>
							<span className="text-foreground relative transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-300">
								Resume
							</span>
						</Link>
					</Button>
					<div className="bg-border/50 mx-0.5 h-4 w-px" aria-hidden="true" />
					<Button
						asChild
						variant="ghost"
						size="default"
						className={`group inline-flex items-center rounded-full bg-transparent px-4 py-2.5 font-medium transition-all hover:bg-indigo-50/60 active:scale-95 dark:hover:bg-indigo-500/10 ${
							isAboutVisible ? 'ring-1 ring-indigo-500/20' : ''
						}`}
					>
						<Link href="/contact">
							<Mail
								className={`text-muted-foreground/90 mr-2 h-5 w-5 transition-all group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:text-indigo-600 dark:group-hover:text-indigo-400`}
							/>
							<span className="text-foreground relative transition-colors group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
								Contact
							</span>
						</Link>
					</Button>
				</div>
			)}
		</div>
	)
}
