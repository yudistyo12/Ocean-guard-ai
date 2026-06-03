"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import Link from "next/link";
import GlowingButton from "../ui/GlowingButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Mission Control", href: "#mission-control" },
    { name: "Prediction Engine", href: "#prediction" },
    { name: "Analytics", href: "#analytics" },
    { name: "Ecosystem", href: "#ecosystem" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-4" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-primary-dark border border-primary-cyan glow-border">
            <Shield className="w-5 h-5 text-primary-cyan group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-bold text-xl tracking-wider text-white">
            OCEAN <span className="text-primary-cyan glow-text">GUARD</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-secondary-white/80 hover:text-primary-cyan transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <GlowingButton size="sm">Launch System</GlowingButton>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-panel border-t-0 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-secondary-white/80 hover:text-primary-cyan"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <GlowingButton className="w-full">Launch System</GlowingButton>
        </div>
      )}
    </motion.header>
  );
}
