"use client";
import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import GlassCard from "../ui/GlassCard";

const stats = [
  { value: 14.2, suffix: "M", label: "Sq Km Protected" },
  { value: 842, suffix: "+", label: "Threats Prevented" },
  { value: 99.8, suffix: "%", label: "Detection Accuracy" },
  { value: 45, suffix: "M", label: "Tons CO2 Reduced" },
];

export default function GlobalImpact() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <GlassCard holographic className="text-center py-16 px-8 border-2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-12"
          >
            Global <span className="text-accent-cyan">Impact</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="p-6 rounded-xl bg-primary-dark/40 border border-secondary-white/10"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 glow-text">
                  <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 1 : 0} duration={3} enableScrollSpy scrollSpyOnce />
                  <span className="text-primary-cyan">{stat.suffix}</span>
                </div>
                <div className="text-secondary-white/60 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
