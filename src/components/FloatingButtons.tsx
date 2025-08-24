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
			className={`fixed z-50 transition-all duration-500 ease-in-out ${
				isAboutVisible
					? 'top-4 right-4 flex space-x-2 border-none bg-transparent p-0 backdrop-blur-none'
					: 'bg-secondary/50 border-border bottom-48 left-1/2 inline-flex -translate-x-1/2 rounded-full border p-4 backdrop-blur-sm'
			}`}
		>
			<Link
				href="https://drive.google.com/file/d/1BT1yYVTMimJOUFHBXF3dzm9Jf02hMGSV/view?usp=sharing"
				passHref
			>
				<Button
					variant={isAboutVisible ? 'outline' : 'default'}
					size={isAboutVisible ? 'sm' : 'default'}
					className={
						isAboutVisible
							? ''
							: 'mx-2 inline-flex cursor-pointer items-center rounded-full bg-white px-8 py-4 text-black transition-colors hover:bg-gray-100'
					}
				>
					<FileText
						className={isAboutVisible ? 'mr-2 h-4 w-4' : 'mr-2 h-7 w-7'}
					/>
					<span>Resume</span>
				</Button>
			</Link>
			<Link href="/" passHref>
				<Button
					variant={isAboutVisible ? 'default' : 'default'}
					size={isAboutVisible ? 'sm' : 'default'}
					className={
						isAboutVisible
							? ''
							: 'mx-2 inline-flex cursor-pointer items-center rounded-full bg-purple-600 px-8 py-4 text-white transition-colors hover:bg-purple-700'
					}
				>
					<Mail className={isAboutVisible ? 'mr-2 h-4 w-4' : 'mr-2 h-7 w-7'} />
					<span>Contact</span>
				</Button>
			</Link>
		</div>
	)
}
