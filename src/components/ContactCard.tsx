'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Briefcase,
	Github,
	GraduationCap,
	Linkedin,
	Mail,
	MapPin,
} from 'lucide-react'
import React from 'react'

const ContactCard: React.FC = () => {
	return (
		<div className="bg-card/50 border-border mx-auto max-w-md rounded-lg border p-6 shadow-lg backdrop-blur-sm">
			<div className="mb-6 flex flex-col items-center text-center">
				<Avatar className="mb-4 h-24 w-24">
					<AvatarImage src="/profile.jpg" alt="Avatar" />
					<AvatarFallback>SA</AvatarFallback>
				</Avatar>
				<h2 className="text-foreground text-3xl font-bold">Sahand Amini</h2>
				<p className="text-lg text-purple-400">Software Engineer</p>
			</div>

			<div className="text-muted-foreground space-y-4 text-lg">
				<div className="flex items-center">
					<Mail className="text-muted-foreground mr-4 h-6 w-6" />
					<span>sahandaamini@gmail.com</span>
				</div>
				<div className="flex items-center">
					<MapPin className="text-muted-foreground mr-4 h-6 w-6" />
					<span>Philadelphia, PA, USA</span>
				</div>
				<div className="flex items-center">
					<Briefcase className="text-muted-foreground mr-4 h-6 w-6" />
					<span>4+ years experience</span>
				</div>
				<div className="flex items-center">
					<GraduationCap className="text-muted-foreground mr-4 h-6 w-6" />
					<span>BS in Computer Science</span>
				</div>
			</div>

			<div className="border-border text-muted-foreground mt-8 border-t pt-6">
				<h3 className="text-foreground mb-4 text-2xl font-semibold">
					Background
				</h3>
				<p className="mb-4 text-base leading-relaxed">
					Born in New Orleans and graduated from Arizona State University. I'm
					an experienced programmer with a passion for learning and improving. I
					specialize in backend development but am always eager to explore the
					latest & greatest technologies!
				</p>
				<div className="flex justify-center space-x-6">
					<a
						href="https://github.com/sahandamini"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						<Github className="h-8 w-8" />
					</a>
					<a
						href="https://linkedin.com/in/sahandamini"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						<Linkedin className="h-8 w-8" />
					</a>
				</div>
			</div>
		</div>
	)
}

export default ContactCard
