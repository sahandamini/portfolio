'use client'

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
			<TimelineItem className="pb-12">
				<TimelineSeparator className="h-32">
					<TimelineDot className="bg-secondary text-secondary-foreground flex h-10 w-10 items-center justify-center">
						<Briefcase className="h-5 w-5" />
					</TimelineDot>
					<TimelineConnector className="bg-secondary w-1" />
				</TimelineSeparator>
				<TimelineContent className="pl-8">
					<TimelineTitle className="text-secondary-foreground mb-2 text-3xl font-bold">
						JPMorgan Chase
					</TimelineTitle>
					<TimelineDescription className="text-muted-foreground text-lg">
						Nov 2024 - Present
					</TimelineDescription>
				</TimelineContent>
			</TimelineItem>
			<TimelineItem className="pb-12">
				<TimelineSeparator className="h-32">
					<TimelineDot className="bg-secondary text-secondary-foreground flex h-10 w-10 items-center justify-center">
						<Briefcase className="h-5 w-5" />
					</TimelineDot>
					<TimelineConnector className="bg-secondary w-1" />
				</TimelineSeparator>
				<TimelineContent className="pl-8">
					<TimelineTitle className="text-secondary-foreground mb-2 text-3xl font-bold">
						Ochsner Health
					</TimelineTitle>
					<TimelineDescription className="text-muted-foreground text-lg">
						Nov 2021 - Nov 2024
					</TimelineDescription>
				</TimelineContent>
			</TimelineItem>
			<TimelineItem>
				<TimelineSeparator>
					<TimelineDot className="bg-secondary text-secondary-foreground flex h-10 w-10 items-center justify-center">
						<GraduationCap className="h-5 w-5" />
					</TimelineDot>
				</TimelineSeparator>
				<TimelineContent className="pl-8">
					<TimelineTitle className="text-secondary-foreground mb-2 text-3xl font-bold">
						Graduated
					</TimelineTitle>
					<TimelineDescription className="text-muted-foreground text-lg">
						May 2021
					</TimelineDescription>
				</TimelineContent>
			</TimelineItem>
		</Timeline>
	)
}

export default MyTimeline
