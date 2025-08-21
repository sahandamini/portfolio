'use client';

import { Github, X, Youtube, Instagram } from 'lucide-react';

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <a href="https://github.com/antfu" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
        <Github size={16} /> GitHub
      </a>
      <a href="https://bsky.app/profile/antfu.me" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
        {/* Bluesky icon not directly available in Lucide, using a placeholder for now */}
        <span className="w-4 h-4 flex items-center justify-center">🟦</span> Bluesky
      </a>
      <a href="https://www.threads.net/@antfu7" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
        {/* Threads icon not directly available in Lucide, using a placeholder for now */}
        <span className="w-4 h-4 flex items-center justify-2">🧵</span> Threads
      </a>
      <a href="https://chat.antfu.me" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
        {/* Discord icon not directly available in Lucide, using a placeholder for now */}
        <span className="w-4 h-4 flex items-center justify-center">💬</span> Discord Server
      </a>
      <a href="https://www.youtube.com/anthonyfu7" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
        <Youtube size={16} /> YouTube
      </a>
      <a href="https://www.instagram.com/antfu7" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
        <Instagram size={16} /> Instagram
      </a>
      <a href="https://space.bilibili.com/668380" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
        {/* Bilibili icon not directly available in Lucide, using a placeholder for now */}
        <span className="w-4 h-4 flex items-center justify-center">📺</span> 哔哩哔哩
      </a>
      <a href="https://x.com/antfuzh" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
        <X size={16} /> 中文推
      </a>
      <a href="https://x.com/antfujp" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
        <X size={16} /> 日本語
      </a>
    </div>
  );
}
