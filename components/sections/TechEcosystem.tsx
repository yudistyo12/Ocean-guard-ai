"use client";
import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Satellite, Radio, Database, Shield } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const technologies = [
  { icon: BrainCircuit, title: "Machine Learning", desc: "Advanced behavioral analysis and anomaly detection algorithms." },
  { icon: Satellite, title: "Satellite Imagery", desc: "SAR and optical imaging for global maritime domain awareness." },
  { icon: Radio, title: "AIS Tracking", desc: "Real-time processing of Automatic Identification System data." },
  { icon: Database, title: "Big Data Analytics", desc: "Petabyte-scale data lakes for historical trend analysis." },
  { icon: Cpu, title: "IoT Sensors", desc: "Integration with smart buoys and autonomous surface vehicles." },
  { icon: Shield, title: "Cloud Infrastructure", desc: "Military-grade encrypted distributed computing network." },
];

export default function TechEcosystem() {
  return (
    <section id="ecosystem" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Technology <span className="text-primary-cyan">Ecosystem</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary-white/70 max-w-2xl mx-auto"
          >
            A cohesive architecture of next-generation technologies working in unison to protect our oceans.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <GlassCard key={i} delay={0.2 + (i * 0.1)} className="group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-primary-cyan/10 flex items-center justify-center mb-6 group-hover:bg-primary-cyan/20 transition-colors border border-primary-cyan/20 group-hover:border-primary-cyan/50 glow-border">
                <tech.icon className="text-primary-cyan w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary-cyan transition-colors">{tech.title}</h3>
              <p className="text-secondary-white/60 text-sm leading-relaxed">
                {tech.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
