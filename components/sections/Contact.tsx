"use client";
import React from "react";
import { motion } from "framer-motion";
import { Send, Terminal } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import GlowingButton from "../ui/GlowingButton";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(0,123,255,0.1),transparent_50%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <GlassCard holographic className="p-8 md:p-12 border-2">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-primary-cyan/30 bg-primary-cyan/10 text-primary-cyan text-sm mb-6">
                    <Terminal className="w-4 h-4" /> Secure Channel
                  </div>
                  <h2 className="text-4xl font-bold mb-4">Establish <br/><span className="text-primary-cyan glow-text">Connection</span></h2>
                  <p className="text-secondary-white/70 mb-8">
                    Inquire about enterprise deployment, research collaborations, or mission support. Our intelligence officers are standing by.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-secondary-white/80">
                      <div className="w-10 h-10 rounded-full border border-primary-cyan/30 flex items-center justify-center text-primary-cyan">
                        <span>HQ</span>
                      </div>
                      <div>Geneva, Switzerland (Global Ops)</div>
                    </div>
                    <div className="flex items-center gap-4 text-secondary-white/80">
                      <div className="w-10 h-10 rounded-full border border-primary-cyan/30 flex items-center justify-center text-primary-cyan">
                        <span>IP</span>
                      </div>
                      <div className="font-mono text-sm text-primary-cyan">192.168.0.1 : SECURE</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="w-full md:w-1/2">
                <motion.form 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-white/60">Designation / Organization</label>
                    <input 
                      type="text" 
                      className="w-full bg-primary-dark/50 border border-secondary-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-cyan transition-colors"
                      placeholder="e.g. Maritime Authority"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-white/60">Secure Comm Link (Email)</label>
                    <input 
                      type="email" 
                      className="w-full bg-primary-dark/50 border border-secondary-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-cyan transition-colors"
                      placeholder="Transmission address"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-white/60">Encrypted Message</label>
                    <textarea 
                      className="w-full bg-primary-dark/50 border border-secondary-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-cyan transition-colors h-32 resize-none"
                      placeholder="Enter mission parameters..."
                    ></textarea>
                  </div>
                  <GlowingButton type="submit" className="w-full mt-4">
                    Transmit Data <Send className="w-4 h-4" />
                  </GlowingButton>
                </motion.form>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
