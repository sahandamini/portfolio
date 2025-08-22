"use client";

import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./theme-toggle").then((mod) => mod.ThemeToggle), {
  ssr: false,
});

export default function ClientThemeToggle() {
  return <ThemeToggle />;
}
