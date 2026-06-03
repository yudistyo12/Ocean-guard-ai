"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Activity, ShieldAlert } from "lucide-react";
import GlowingButton from "../ui/GlowingButton";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);

    useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      // Wait for globe to mount and then set point of view
      setTimeout(() => {
        if (globeRef.current) {
          globeRef.current.pointOfView({ lat: -2.5, lng: 118, altitude: 2 }, 1000);
        }
      }, 500);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* 3D Globe Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-70 md:opacity-100 md:left-1/3">
        {mounted && (
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
            width={800}
            height={800}
            arcsData={[
              { startLat: -6.2, startLng: 106.8, endLat: 1.3, endLng: 103.8, color: ['#00E5FF', '#64FFDA'] },
              { startLat: -6.2, startLng: 106.8, endLat: -33.8, endLng: 151.2, color: ['#00E5FF', '#007BFF'] },
              { startLat: 1.3, startLng: 103.8, endLat: 35.6, endLng: 139.6, color: ['#64FFDA', '#00FFC8'] }
            ]}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={1500}
          />
        )}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-cyan/30 bg-primary-cyan/10 text-primary-cyan text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse" />
            Active Global Monitoring
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Protecting Oceans with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan to-secondary-teal">
              Artificial Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-secondary-white/80 mb-10 max-w-xl"
          >
            Next-generation maritime intelligence for a safer and smarter world. Detect threats, track vessels, and predict environmental risks in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <GlowingButton size="lg" className="w-full sm:w-auto">
              Launch Mission Control
            </GlowingButton>
            <GlowingButton size="lg" variant="outline" className="w-full sm:w-auto">
              Watch Demonstration
            </GlowingButton>
          </motion.div>
        </div>
      </div>

      {/* Floating Info Cards */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden lg:flex absolute bottom-20 left-10 glass-panel rounded-xl p-4 items-center gap-4 border border-primary-cyan/20"
      >
        <div className="p-3 rounded-lg bg-primary-cyan/20 text-primary-cyan">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm text-secondary-white/60">Vessels Tracked</div>
          <div className="font-bold text-xl text-primary-cyan glow-text">14,239</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden lg:flex absolute top-40 right-20 glass-panel rounded-xl p-4 items-center gap-4 border border-accent-cyan/20"
      >
        <div className="p-3 rounded-lg bg-accent-cyan/20 text-accent-cyan">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm text-secondary-white/60">Threats Prevented</div>
          <div className="font-bold text-xl text-accent-cyan glow-text">842</div>
        </div>
      </motion.div>
    </section>
  );
}
