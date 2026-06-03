"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlowingButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function GlowingButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: GlowingButtonProps) {
  const baseStyles = "relative font-semibold rounded-lg overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary: "bg-primary-cyan text-primary-dark hover:bg-white glow-border",
    secondary: "bg-primary-blue text-white hover:bg-blue-400 glow-border",
    outline: "border border-primary-cyan text-primary-cyan hover:bg-primary-cyan/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      )}
    </motion.button>
  );
}
