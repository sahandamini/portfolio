'use client'

import ContactHeader from '@/components/ContactHeader'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Linkedin, Mail } from 'lucide-react'

export default function ContactPage() {
	return (
		<div className="bg-background flex min-h-screen items-center justify-center p-4">
			<div className="absolute top-4 left-4">
				<ThemeToggle />
			</div>
			<ContactHeader />
			<Card className="w-full max-w-2xl p-8 shadow-lg">
				<div className="mb-6 flex items-center justify-between">
					<h1 className="text-5xl font-bold">Get In Touch</h1>
					<Avatar className="h-24 w-24">
						<AvatarImage src="/profile.jpg" alt="Avatar" />
						<AvatarFallback>SA</AvatarFallback>
					</Avatar>
				</div>

				<div className="mb-2 flex justify-start space-x-4">
					<Button
						variant="outline"
						size="lg"
						asChild
						className="bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
					>
						<a href="mailto:sahandaamini@gmail.com">
							<Mail className="h-5 w-5" />
						</a>
					</Button>
					<Button
						variant="outline"
						size="lg"
						asChild
						className="bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
					>
						<a
							href="https://www.linkedin.com/in/sahandamini/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Linkedin className="h-5 w-5" />
						</a>
					</Button>
				</div>

				<form className="space-y-6">
					<div>
						<Label htmlFor="name" className="mb-2 block">
							Name
						</Label>
						<Input
							id="name"
							placeholder="Enter your name"
							className="border border-gray-300 dark:border-gray-700"
						/>
					</div>
					<div>
						<Label htmlFor="email" className="mb-2 block">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="Enter your email"
							className="border border-gray-300 dark:border-gray-700"
						/>
					</div>
					<div>
						<Label htmlFor="message" className="mb-2 block">
							Message
						</Label>
						<Textarea
							id="message"
							placeholder="Enter your message"
							rows={5}
							className="border border-gray-300 dark:border-gray-700"
						/>
					</div>
					<Button type="submit" className="w-full">
						Send <Mail className="ml-2 h-4 w-4" />
					</Button>
				</form>
			</Card>
		</div>
	)
}
