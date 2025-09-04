'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { sendEmail } from '@/app/actions'
import ContactHeader from '@/components/ContactHeader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid email address' })
		.nonempty({ message: 'Email is required' }),
	message: z.string().nonempty({ message: 'Message is required' }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactPage() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			message: '',
		},
	})

	async function onSubmit(values: FormValues) {
		const formData = new FormData()
		formData.append('email', values.email)
		formData.append('message', values.message)

		const response = await sendEmail(formData)

		if (response?.error) {
			toast.error(response.error.message || 'An unexpected error occurred')
		} else {
			toast.success('Message sent successfully!')
			form.reset()
		}
	}

	return (
		<div className="bg-background flex min-h-screen items-center justify-center p-4">
			{/* Keep the return button visually where it was, but fix it so it stays on screen */}
			<Link
				href="/"
				className="fixed top-1/2 left-1/2 -translate-x-[28rem] -translate-y-[15rem] z-50"
			>
				<Button variant="outline" className="h-16 w-16 cursor-pointer " aria-label="Back to home">
					<ArrowLeft className="h-16 w-16" />
				</Button>
			</Link>
			<ContactHeader />
			<Card className="w-full max-w-2xl p-8 shadow-lg">
				<div className="flex items-center justify-between">
					<h1 className="text-5xl font-bold">Get In Touch</h1>
					<Avatar className="h-24 w-24">
						<AvatarImage src="/profile.jpg" alt="Avatar" />
						<AvatarFallback>SA</AvatarFallback>
					</Avatar>
				</div>

				<div className="flex justify-start space-x-4">
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

				<Form {...form}>
					<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="your.email@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter your message"
											rows={5}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full cursor-pointer"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? 'Sending...' : 'Send'}{' '}
							<Mail className="ml-2 h-4 w-4" />
						</Button>
					</form>
				</Form>
			</Card>
		</div>
	)
}
