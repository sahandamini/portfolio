'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const HeroAnimation: React.FC = () => {
	return (
		<div className="text-center relative z-10">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<TypeAnimation
					sequence={['Sahand Amini', 1000]}
					wrapper="h1"
					cursor={true}
					repeat={0}
					className="text-7xl font-bold md:text-9xl gradient-text mb-6 tracking-tight"
				/>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
				className="relative"
			>
				<p className="text-3xl md:text-4xl text-muted-foreground font-light tracking-wide">
					Full Stack Engineer
				</p>
				<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
			</motion.div>
		</div>
	)
}

export default HeroAnimation
