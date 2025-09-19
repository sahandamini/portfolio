'use client'

import { motion } from 'framer-motion'
import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDescription,
	TimelineDot,
	TimelineItem,
	TimelineSeparator,
	TimelineTitle,
} from '@/components/ui/timeline'
import { Briefcase, GraduationCap } from 'lucide-react'
import React from 'react'

const MyTimeline: React.FC = () => {
	return (
		<Timeline className="mx-auto w-full max-w-2xl">
			{[
				{
					company: "JPMorgan Chase",
					period: "Nov 2024 - Present",
					icon: Briefcase,
					delay: 0
				},
				{
					company: "Ochsner Health",
					period: "Nov 2021 - Nov 2024",
					icon: Briefcase,
					delay: 0.2
				},
				{
					company: "Graduated",
					period: "May 2021",
					icon: GraduationCap,
					delay: 0.4,
					isLast: true
				}
			].map((item, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: item.delay, ease: "easeOut" }}
					viewport={{ once: true }}
				>
					<TimelineItem className={item.isLast ? "" : "pb-16"}>
						<TimelineSeparator className="h-40">
							<motion.div
								whileHover={{ scale: 1.2, rotate: 5 }}
								transition={{ type: "spring", stiffness: 300, damping: 20 }}
							>
								<TimelineDot className="bg-gradient-to-br from-purple-500 to-pink-500 text-white flex h-14 w-14 items-center justify-center shadow-lg ring-4 ring-purple-500/20">
									<item.icon className="h-7 w-7" />
								</TimelineDot>
							</motion.div>
							{!item.isLast && (
								<TimelineConnector className="bg-gradient-to-b from-purple-500/50 to-pink-500/50 w-1 rounded-full" />
							)}
						</TimelineSeparator>
						<TimelineContent className="pl-10">
							<motion.div
								whileHover={{ x: 5 }}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
							>
								<TimelineTitle className="text-foreground mb-3 text-4xl font-bold">
									{item.company}
								</TimelineTitle>
								<TimelineDescription className="text-muted-foreground text-xl font-medium">
									{item.period}
								</TimelineDescription>
							</motion.div>
						</TimelineContent>
					</TimelineItem>
				</motion.div>
			))}
		</Timeline>
	)
}

export default MyTimeline