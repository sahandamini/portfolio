"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingButtons() {
  return (
    <>
      <div className="sticky top-0 inline-flex p-4 rounded-full bg-secondary/50 backdrop-blur-sm border border-border mt-auto mb-48 mx-auto">
        <Link
          href="https://drive.google.com/file/d/1BT1yYVTMimJOUFHBXF3dzm9Jf02hMGSV/view?usp=sharing"
          passHref
        >
          <Button
            variant="default"
            className="inline-flex items-center px-8 py-4 rounded-full bg-white text-black hover:bg-gray-100 transition-colors mx-2 cursor-pointer"
          >
            <FileText className="mr-2 h-7 w-7" />
            <span>Resume</span>
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button className="inline-flex items-center px-8 py-4 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors mx-2 cursor-pointer">
            <Mail className="mr-2 h-7 w-7" />
            <span>Contact</span>
          </Button>
        </Link>
      </div>
    </>
  );
}
