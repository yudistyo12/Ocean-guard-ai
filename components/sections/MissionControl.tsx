"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Navigation, Activity } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-primary-dark/50 animate-pulse rounded-2xl border border-primary-cyan/20">Loading Map Data...</div>
});

export default function MissionControl() {
  const [isTracking, setIsTracking] = useState(true);
  const [isMonitoring, setIsMonitoring] = useState(true);
  
  const [alerts, setAlerts] = useState([
    { id: 1, type: "critical", msg: "Unidentified vessel entering EEZ", loc: "S 8°30' E 119°30'", time: "Just now" },
    { id: 2, type: "warning", msg: "Anomalous AIS signal pattern", loc: "S 3°05' E 114°30'", time: "2m ago" },
    { id: 3, type: "info", msg: "Autonomous patrol drone deployed", loc: "Sector 7G", time: "15m ago" },
  ]);

  useEffect(() => {
    if (!isMonitoring) return;
    const interval = setInterval(() => {
      const rand = Math.random();
      const type = rand > 0.8 ? "critical" : rand > 0.4 ? "warning" : "info";
      const messages = {
        critical: "Unauthorized vessel intercepted",
        warning: "Deviation from registered route",
        info: "Routine area scan completed"
      };
      
      const newAlert = {
        id: Date.now(),
        type: type,
        msg: messages[type as keyof typeof messages],
        loc: `S ${(Math.random() * 10).toFixed(2)}' E ${(100 + Math.random() * 40).toFixed(2)}'`,
        time: "Just now"
      };
      setAlerts(prev => [newAlert, ...prev].slice(0, 8));
    }, 6000);
    return () => clearInterval(interval);
  }, [isMonitoring]);

  return (
    <section id="mission-control" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Mission Control <span className="text-primary-cyan">Dashboard</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary-white/70 max-w-2xl"
          >
            Real-time maritime tracking and threat monitoring centered around Indonesia&apos;s territorial waters. Our AI processes thousands of data points per second.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          {/* Main Map */}
          <div className="lg:col-span-2 relative rounded-2xl glass-panel p-2">
            <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
              <button 
                onClick={() => setIsTracking(!isTracking)}
                className={`px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold transition-all border cursor-pointer ${
                  isTracking ? "bg-primary-cyan/10 text-primary-cyan border-primary-cyan/30 shadow-[0_0_15px_rgba(0,229,255,0.3)]" : "glass text-secondary-white/50 border-secondary-white/20"
                }`}>
                <Navigation className={`w-4 h-4 ${isTracking ? "animate-pulse" : ""}`} /> 
                Live Tracking {isTracking ? "Active" : "Paused"}
              </button>
              
              <button 
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={`px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold transition-all border cursor-pointer ${
                  isMonitoring ? "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30 shadow-[0_0_15px_rgba(0,255,200,0.3)]" : "glass text-secondary-white/50 border-secondary-white/20"
                }`}>
                <Activity className={`w-4 h-4 ${isMonitoring ? "animate-pulse" : ""}`} /> 
                AI Monitoring {isMonitoring ? "On" : "Off"}
              </button>
            </div>
            {/* Provide explicit props to map component so it can update based on state */}
            <MapComponent isTracking={isTracking} isMonitoring={isMonitoring} />
          </div>

          {/* Intelligence Feed */}
          <GlassCard className="flex flex-col h-full overflow-hidden" delay={0.3}>
            <div className="flex items-center justify-between mb-6 border-b border-primary-cyan/20 pb-4">
              <div className="flex items-center gap-3">
                <Crosshair className="text-primary-cyan" />
                <h3 className="font-bold text-xl">Intelligence Feed</h3>
              </div>
              {isMonitoring && (
                <div className="flex items-center gap-2">
                   <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-cyan"></span>
                  </span>
                  <span className="text-xs text-accent-cyan font-bold uppercase tracking-widest animate-pulse">Syncing</span>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              <AnimatePresence>
                {alerts.map((alert, i) => (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, scale: 0.9 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={alert.id} 
                    className={`p-4 rounded-xl border ${
                      alert.type === 'critical' ? 'bg-red-500/10 border-red-500/30' : 
                      alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' : 
                      'bg-primary-cyan/10 border-primary-cyan/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-bold uppercase ${
                        alert.type === 'critical' ? 'text-red-400' : 
                        alert.type === 'warning' ? 'text-yellow-400' : 
                        'text-primary-cyan'
                      }`}>
                        {alert.type} ALERT
                      </span>
                      <span className="text-xs text-secondary-white/50">{alert.time}</span>
                    </div>
                    <p className="text-sm font-medium mb-1">{alert.msg}</p>
                    <div className="text-xs text-secondary-white/60 flex items-center gap-1 mt-2">
                      <Navigation className="w-3 h-3" /> {alert.loc}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
