'use client'

import { motion } from 'framer-motion'
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
		<motion.div 
			whileHover={{ y: -5 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
			className="card-premium mx-auto max-w-lg rounded-2xl p-8 shadow-2xl"
		>
			<motion.div 
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				viewport={{ once: true }}
				className="mb-8 flex flex-col items-center text-center"
			>
				<motion.div
					whileHover={{ scale: 1.1, rotate: 5 }}
					transition={{ type: "spring", stiffness: 300, damping: 20 }}
				>
					<Avatar className="mb-6 h-28 w-28 ring-4 ring-purple-500/20 ring-offset-4 ring-offset-background">
						<AvatarImage src="/profile.jpg" alt="Avatar" />
						<AvatarFallback className="text-2xl font-bold">SA</AvatarFallback>
					</Avatar>
				</motion.div>
				<h2 className="text-foreground text-4xl font-bold mb-2">Sahand Amini</h2>
				<div className="relative">
					<p className="text-xl font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
						Software Engineer
					</p>
					<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
				</div>
			</motion.div>

			<div className="text-muted-foreground space-y-5 text-lg">
				{[
					{ icon: Mail, text: "sahandaamini@gmail.com" },
					{ icon: MapPin, text: "Philadelphia, PA, USA" },
					{ icon: Briefcase, text: "4+ years experience" },
					{ icon: GraduationCap, text: "BS in Computer Science" }
				].map((item, index) => (
					<motion.div 
						key={index}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
						viewport={{ once: true }}
						whileHover={{ x: 5 }}
						className="flex items-center group cursor-default"
					>
						<item.icon className="text-muted-foreground mr-4 h-6 w-6 group-hover:text-purple-400 transition-colors duration-200" />
						<span className="group-hover:text-foreground transition-colors duration-200">{item.text}</span>
					</motion.div>
				))}
			</div>

			<div className="border-border/50 text-muted-foreground mt-8 border-t pt-8">
				<motion.h3 
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
					viewport={{ once: true }}
					className="text-foreground mb-6 text-2xl font-semibold"
				>
					Background
				</motion.h3>
				<motion.p 
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
					viewport={{ once: true }}
					className="mb-6 text-base leading-relaxed"
				>
					Born in New Orleans and graduated from Arizona State University.
					I&apos;m an experienced programmer with a passion for learning and
					improving. I specialize in backend development but am always eager to
					explore the latest & greatest technologies!
				</motion.p>
				<motion.div 
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
					viewport={{ once: true }}
					className="flex justify-center space-x-8"
				>
					<motion.a
						whileHover={{ scale: 1.2, y: -2 }}
						whileTap={{ scale: 0.9 }}
						href="https://github.com/sahandamini"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-purple-400 transition-all duration-200 p-2 rounded-full hover:bg-purple-500/10"
					>
						<Github className="h-7 w-7" />
					</motion.a>
					<motion.a
						whileHover={{ scale: 1.2, y: -2 }}
						whileTap={{ scale: 0.9 }}
						href="https://linkedin.com/in/sahandamini"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-blue-400 transition-all duration-200 p-2 rounded-full hover:bg-blue-500/10"
					>
						<Linkedin className="h-7 w-7" />
					</motion.a>
				</motion.div>
			</div>
		</motion.div>
	)
}

export default ContactCard
