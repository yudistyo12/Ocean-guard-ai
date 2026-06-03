"use client";
import React from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import GlassCard from "../ui/GlassCard";

const areaData = [
  { name: "Jan", fishing: 400, anomalies: 240 },
  { name: "Feb", fishing: 300, anomalies: 139 },
  { name: "Mar", fishing: 200, anomalies: 980 },
  { name: "Apr", fishing: 278, anomalies: 390 },
  { name: "May", fishing: 189, anomalies: 480 },
  { name: "Jun", fishing: 239, anomalies: 380 },
  { name: "Jul", fishing: 349, anomalies: 430 },
];

const barData = [
  { name: "Zone A", risk: 85 },
  { name: "Zone B", risk: 45 },
  { name: "Zone C", risk: 78 },
  { name: "Zone D", risk: 30 },
  { name: "Zone E", risk: 92 },
];

export default function ThreatAnalytics() {
  return (
    <section id="analytics" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Threat <span className="text-primary-cyan">Analytics</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary-white/70 max-w-2xl mx-auto"
          >
            Comprehensive data visualization of illegal fishing trends, environmental anomalies, and ocean health indices over time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard delay={0.2} className="h-[400px]">
            <h3 className="font-bold text-xl mb-6">Illegal Fishing vs Anomalies</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorFishing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAnomalies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFC8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00FFC8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#1F2937" tick={{fill: '#FFFFFF', opacity: 0.5}} />
                <YAxis stroke="#1F2937" tick={{fill: '#FFFFFF', opacity: 0.5}} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" opacity={0.3} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 25, 47, 0.9)', border: '1px solid rgba(0, 229, 255, 0.3)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="fishing" stroke="#00E5FF" fillOpacity={1} fill="url(#colorFishing)" />
                <Area type="monotone" dataKey="anomalies" stroke="#00FFC8" fillOpacity={1} fill="url(#colorAnomalies)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard delay={0.4} className="h-[400px]">
            <h3 className="font-bold text-xl mb-6">Environmental Risk by Zone</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3B30" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF3B30" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#1F2937" tick={{fill: '#FFFFFF', opacity: 0.5}} />
                <YAxis stroke="#1F2937" tick={{fill: '#FFFFFF', opacity: 0.5}} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" opacity={0.3} vertical={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'rgba(10, 25, 47, 0.9)', border: '1px solid rgba(255, 59, 48, 0.3)', borderRadius: '8px' }}
                />
                <Bar dataKey="risk" fill="url(#colorRisk)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
