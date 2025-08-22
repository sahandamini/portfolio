"use client";

import React from "react";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Briefcase, GraduationCap } from "lucide-react";

const MyTimeline: React.FC = () => {
  return (
    <Timeline className="w-full max-w-2xl mx-auto">
      <TimelineItem className="pb-12">
        <TimelineSeparator className="h-32">
          <TimelineDot className="w-10 h-10 bg-secondary text-secondary-foreground flex items-center justify-center">
            <Briefcase className="h-5 w-5" />
          </TimelineDot>
          <TimelineConnector className="w-1 bg-secondary" />
        </TimelineSeparator>
        <TimelineContent className="pl-8">
          <TimelineTitle className="text-3xl font-bold text-secondary-foreground mb-2">
            JPMorgan Chase
          </TimelineTitle>
          <TimelineDescription className="text-lg text-muted-foreground">
            Nov 2024 - Present
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="pb-12">
        <TimelineSeparator className="h-32">
          <TimelineDot className="w-10 h-10 bg-secondary text-secondary-foreground flex items-center justify-center">
            <Briefcase className="h-5 w-5" />
          </TimelineDot>
          <TimelineConnector className="w-1 bg-secondary" />
        </TimelineSeparator>
        <TimelineContent className="pl-8">
          <TimelineTitle className="text-3xl font-bold text-secondary-foreground mb-2">
            Ochsner Health
          </TimelineTitle>
          <TimelineDescription className="text-lg text-muted-foreground">
            Nov 2021 - Nov 2024
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="w-10 h-10 bg-secondary text-secondary-foreground flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent className="pl-8">
          <TimelineTitle className="text-3xl font-bold text-secondary-foreground mb-2">
            Graduated
          </TimelineTitle>
          <TimelineDescription className="text-lg text-muted-foreground">
            May 2021
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default MyTimeline;
