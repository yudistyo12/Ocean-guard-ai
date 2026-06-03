"use client";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-primary-cyan/20 bg-background pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,229,255,0.05),transparent_50%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary-cyan" />
              <span className="font-bold text-xl tracking-wider text-white">
                OCEAN <span className="text-primary-cyan glow-text">GUARD</span>
              </span>
            </div>
            <p className="text-secondary-white/60 max-w-sm">
              Next-generation maritime intelligence platform protecting our oceans with advanced AI and satellite monitoring.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-secondary-white/60">
              <li><a href="#mission-control" className="hover:text-primary-cyan transition-colors">Mission Control</a></li>
              <li><a href="#prediction" className="hover:text-primary-cyan transition-colors">AI Engine</a></li>
              <li><a href="#analytics" className="hover:text-primary-cyan transition-colors">Analytics</a></li>
              <li><a href="#ecosystem" className="hover:text-primary-cyan transition-colors">Ecosystem</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Organization</h4>
            <ul className="space-y-2 text-sm text-secondary-white/60">
              <li><a href="#" className="hover:text-primary-cyan transition-colors">About Us</a></li>
              <li><a href="#partnerships" className="hover:text-primary-cyan transition-colors">Partnerships</a></li>
              <li><a href="#case-studies" className="hover:text-primary-cyan transition-colors">Case Studies</a></li>
              <li><a href="#contact" className="hover:text-primary-cyan transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-secondary-white/40">
          <p>&copy; {new Date().getFullYear()} Ocean Guard AI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
