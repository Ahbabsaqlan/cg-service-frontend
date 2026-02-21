"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface CursorLinkProps {
  href: string;
  emoji: string; // The emoji to show (e.g., "🔍")
  children: ReactNode;
  className?: string;
}

export default function CursorLink({ href, emoji, children, className }: CursorLinkProps) {
  
  const handleMouseEnter = () => {
    // Send the specific emoji to the CustomCursor
    window.dispatchEvent(new CustomEvent("cursor-emoji-set", { detail: emoji }));
  };

  const handleMouseLeave = () => {
    // Reset cursor
    window.dispatchEvent(new CustomEvent("cursor-emoji-clear"));
  };

  return (
    <Link 
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
}