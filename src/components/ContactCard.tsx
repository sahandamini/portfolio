"use client";

import React from "react";
import {
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ContactCard: React.FC = () => {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 shadow-lg max-w-md mx-auto">
      <div className="flex flex-col items-center text-center mb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="/profile.jpg" alt="Avatar" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <h2 className="text-3xl font-bold text-foreground">Sahand Amini</h2>
        <p className="text-purple-400 text-lg">Software Engineer</p>
      </div>

      <div className="space-y-4 text-muted-foreground text-lg">
        <div className="flex items-center">
          <Mail className="h-6 w-6 mr-4 text-muted-foreground" />
          <span>sahandaamini@gmail.com</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-6 w-6 mr-4 text-muted-foreground" />
          <span>Philadelphia, PA, USA</span>
        </div>
        <div className="flex items-center">
          <Briefcase className="h-6 w-6 mr-4 text-muted-foreground" />
          <span>4+ years experience</span>
        </div>
        <div className="flex items-center">
          <GraduationCap className="h-6 w-6 mr-4 text-muted-foreground" />
          <span>BS in Computer Science</span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border text-muted-foreground">
        <h3 className="text-2xl font-semibold text-foreground mb-4">
          Background
        </h3>
        <p className="text-base leading-relaxed mb-4">
          Born in New Orleans, LA and graduated from Arizona State University.
          I'm a passionate programmer who loves to learn. I mostly do backend
          development professionally but am always eager to explore the latest &
          greatest technologies!
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
  );
};

export default ContactCard;
