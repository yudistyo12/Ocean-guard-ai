"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Droplets, FishOff } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import GlowingButton from "../ui/GlowingButton";

const cases = [
  {
    id: "illegal-fishing",
    title: "Galapagos Marine Reserve",
    icon: FishOff,
    before: "120+ undetected incursions monthly",
    after: "0 undetected incursions, 45 vessels intercepted",
    efficiency: "+300%",
    desc: "Deploying AI-powered AIS anomaly detection to protect the fragile Galapagos ecosystem from dark fleet fishing vessels."
  },
  {
    id: "oil-spill",
    title: "North Sea Monitoring",
    icon: Droplets,
    before: "72 hours average detection time",
    after: "2 hours average detection time",
    efficiency: "-97%",
    desc: "Utilizing SAR satellite imagery and computer vision to identify micro-spills before they become ecological disasters."
  }
];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState(cases[0].id);

  const activeCase = cases.find(c => c.id === activeTab);

  return (
    <section id="case-studies" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Mission <span className="text-primary-cyan">Success</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary-white/70 max-w-2xl mx-auto"
          >
            Real-world deployments where OCEAN GUARD AI has transformed maritime security and environmental protection.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Tabs */}
          <div className="w-full lg:w-1/3 space-y-4">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeTab === c.id 
                    ? "bg-primary-cyan/20 border border-primary-cyan/50 glow-border" 
                    : "bg-primary-dark/30 border border-secondary-white/10 hover:border-primary-cyan/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <c.icon className={`w-6 h-6 ${activeTab === c.id ? "text-primary-cyan" : "text-secondary-white/50"}`} />
                  <span className={`font-bold text-lg ${activeTab === c.id ? "text-white" : "text-secondary-white/70"}`}>
                    {c.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase?.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <GlassCard className="h-full flex flex-col justify-between p-8 border-2">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-primary-cyan glow-text">{activeCase?.title}</h3>
                    <p className="text-secondary-white/80 text-lg mb-10 leading-relaxed">
                      {activeCase?.desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30">
                        <div className="text-sm font-bold text-red-400 mb-2 uppercase tracking-wider">Before AI</div>
                        <div className="text-xl font-medium">{activeCase?.before}</div>
                      </div>
                      <div className="p-6 rounded-xl bg-primary-cyan/10 border border-primary-cyan/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          {activeCase?.icon && <activeCase.icon className="w-24 h-24" />}
                        </div>
                        <div className="text-sm font-bold text-primary-cyan mb-2 uppercase tracking-wider">After Deployment</div>
                        <div className="text-xl font-medium text-white">{activeCase?.after}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-secondary-white/10 pt-6">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-accent-cyan glow-text">{activeCase?.efficiency}</span>
                      <span className="text-sm text-secondary-white/60 w-20">Efficiency Increase</span>
                    </div>
                    <GlowingButton variant="outline" size="sm">
                      Read Full Report <ChevronRight className="w-4 h-4" />
                    </GlowingButton>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
