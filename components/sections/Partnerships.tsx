"use client";
import React from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "Global Coast Guard Alliance", type: "Defense" },
  { name: "Oceanic Preservation Society", type: "NGO" },
  { name: "Earth Observation Satellites", type: "Technology" },
  { name: "Maritime Intelligence Bureau", type: "Government" },
  { name: "DeepBlue Research Institute", type: "Academic" },
];

export default function Partnerships() {
  return (
    <section id="partnerships" className="py-24 border-y border-secondary-white/5 bg-primary-dark/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary-white/60 uppercase tracking-[0.2em] font-semibold text-sm mb-4"
          >
            Trusted by International Stakeholders
          </motion.h3>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-6 py-4 rounded-full border border-secondary-white/10 bg-secondary-white/5 hover:bg-primary-cyan/10 hover:border-primary-cyan/30 transition-all cursor-pointer flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse" />
              <span className="font-medium text-secondary-white/80">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
