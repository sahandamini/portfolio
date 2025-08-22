"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getTransformValue = () => {
    switch (theme) {
      case "system":
        return "translateX(0px)";
      case "dark":
        return "translateX(36px)";
      case "light":
        return "translateX(72px)";
      default:
        return "translateX(0px)";
    }
  };

  return (
    <div className="relative inline-flex items-center rounded-full bg-neutral-100 p-1 dark:bg-gray-800">
      <div
        className="absolute h-9 w-9 rounded-full bg-purple-700 transition-all duration-300 ease-in-out dark:bg-purple-700"
        style={{ transform: getTransformValue() }}
      />
      <Button
        variant="ghost"
        size="icon"
        className="relative z-10 rounded-full hover:bg-transparent dark:hover:bg-transparent"
        onClick={() => setTheme("system")}
      >
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">System theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="relative z-10 rounded-full hover:bg-transparent dark:hover:bg-transparent"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Dark theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="relative z-10 rounded-full hover:bg-transparent dark:hover:bg-transparent"
        onClick={() => setTheme("light")}
      >
        <Sun className={cn("h-[1.2rem] w-[1.2rem]", theme === "light" && "text-white")} />
        <span className="sr-only">Light theme</span>
      </Button>
    </div>
  );
}
