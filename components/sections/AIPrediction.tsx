"use client";
import React from "react";
import { motion } from "framer-motion";
import { Brain, Target, ShieldCheck } from "lucide-react";
import GlassCard from "../ui/GlassCard";

export default function AIPrediction() {
  const predictions = [
    { label: "Confidence Level", value: 94, color: "text-accent-cyan", bg: "bg-accent-cyan" },
    { label: "Threat Probability", value: 12, color: "text-secondary-teal", bg: "bg-secondary-teal" },
    { label: "Environmental Risk", value: 8, color: "text-primary-cyan", bg: "bg-primary-cyan" }
  ];

  return (
    <section id="prediction" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-primary-cyan/20 rounded-full blur-[100px] animate-pulse" />
              <GlassCard holographic className="h-full flex flex-col justify-center items-center text-center relative z-10 border-2">
                <Brain className="w-20 h-20 text-primary-cyan mb-6 glow-text animate-pulse" />
                <h3 className="text-2xl font-bold mb-2">Deep Learning Engine</h3>
                <p className="text-secondary-white/60 text-sm mb-8">Processing satellite imagery, AIS patterns, and meteorological data.</p>
                <div className="flex gap-4">
                  <div className="p-4 rounded-xl bg-primary-dark/50 border border-primary-cyan/30">
                    <div className="text-3xl font-bold text-primary-cyan glow-text">99.8%</div>
                    <div className="text-xs text-secondary-white/50 uppercase tracking-wider">Uptime</div>
                  </div>
                  <div className="p-4 rounded-xl bg-primary-dark/50 border border-primary-cyan/30">
                    <div className="text-3xl font-bold text-accent-cyan glow-text">&lt;1s</div>
                    <div className="text-xs text-secondary-white/50 uppercase tracking-wider">Latency</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6"
            >
              Predictive <span className="text-primary-cyan">AI Assessment</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-secondary-white/70 mb-10"
            >
              Our proprietary machine learning models analyze behavioral patterns of vessels to predict illegal fishing, smuggling, and potential environmental disasters before they occur.
            </motion.p>

            <div className="space-y-6">
              {predictions.map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{item.label}</span>
                    <span className={`font-bold ${item.color}`}>{item.value}%</span>
                  </div>
                  <div className="h-3 w-full bg-secondary-gray rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className={`h-full ${item.bg} glow`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10 grid grid-cols-2 gap-4"
            >
              <div className="flex items-center gap-3 p-4 rounded-xl border border-secondary-teal/20 bg-secondary-teal/5">
                <Target className="text-secondary-teal w-8 h-8" />
                <div>
                  <div className="text-sm text-secondary-white/60">Classification</div>
                  <div className="font-bold">Anomalous</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5">
                <ShieldCheck className="text-accent-cyan w-8 h-8" />
                <div>
                  <div className="text-sm text-secondary-white/60">Action</div>
                  <div className="font-bold">Intercept</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
