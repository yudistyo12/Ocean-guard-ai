"use client";
import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  holographic?: boolean;
}

export default function GlassCard({ children, className = "", delay = 0, holographic = false }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`rounded-2xl p-6 ${holographic ? "holographic glass-panel" : "glass-card"} ${className}`}
    >
      {children}
    </motion.div>
  );
}
