"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconShadow: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);

interface MapComponentProps {
  isTracking?: boolean;
  isMonitoring?: boolean;
}

// Define realistic routes (waypoints) across Indonesian waters
const routes = {
  cargo1: [[-5.9, 106.8], [-5.5, 108.5], [-4.8, 110.2], [-4.2, 112.0], [-4.5, 114.5], [-3.0, 117.5], [-1.0, 118.5], [1.5, 119.5]], // Java Sea to Celebes Sea
  cargo2: [[5.5, 98.0], [3.0, 100.0], [1.2, 104.0], [0.0, 105.5], [-2.0, 107.0], [-4.0, 107.5], [-5.9, 106.8]], // Malacca to Java Sea
  cargo3: [[-9.0, 115.5], [-8.5, 115.8], [-7.5, 117.5], [-7.0, 120.0], [-5.5, 124.0], [-4.0, 127.5]], // South of Bali to Banda Sea
  patrol1: [[-4.0, 110.0], [-4.0, 112.0], [-5.0, 112.0], [-5.0, 110.0], [-4.0, 110.0]], // Java Sea loop
  patrol2: [[5.0, 107.0], [5.5, 108.5], [4.5, 109.0], [4.0, 107.5], [5.0, 107.0]], // Natuna Sea loop
  patrol3: [[-10.5, 123.0], [-10.0, 124.5], [-11.0, 125.0], [-11.5, 123.5], [-10.5, 123.0]], // Timor Sea loop
  patrol4: [[-1.0, 118.5], [-2.0, 118.5], [-2.0, 118.0], [-1.0, 118.0], [-1.0, 118.5]], // Makassar Strait
  threat1: [[-9.5, 108.0], [-10.0, 110.0], [-9.8, 112.0], [-9.0, 114.0]], // Indian Ocean (South of Java)
  threat2: [[6.5, 108.0], [6.0, 109.0], [5.5, 108.5]], // Natuna EEZ Border
  threat3: [[-8.0, 135.0], [-8.5, 136.5], [-9.0, 138.0]], // Arafura Sea
  threat4: [[2.0, 136.0], [1.5, 138.0], [1.0, 140.0]] // Pacific Ocean (North of Papua)
} as Record<string, [number, number][]>;

type VesselType = 'cargo' | 'patrol' | 'threat';

interface VesselConfig {
  id: string;
  type: VesselType;
  name: string;
  route: [number, number][];
  speed: number;
}

const vesselsConfig: VesselConfig[] = [
  { id: 'c1', type: 'cargo', name: 'Vessel Alpha (Cargo)', route: routes.cargo1, speed: 0.003 },
  { id: 'c2', type: 'cargo', name: 'Vessel Beta (Cargo)', route: routes.cargo2, speed: 0.004 },
  { id: 'c3', type: 'cargo', name: 'Vessel Gamma (Cargo)', route: routes.cargo3, speed: 0.0035 },
  { id: 'p1', type: 'patrol', name: 'Patrol Boat 1', route: routes.patrol1, speed: 0.005 },
  { id: 'p2', type: 'patrol', name: 'Patrol Boat Natuna', route: routes.patrol2, speed: 0.006 },
  { id: 'p3', type: 'patrol', name: 'Patrol Boat Timor', route: routes.patrol3, speed: 0.0055 },
  { id: 'p4', type: 'patrol', name: 'Patrol Boat Makassar', route: routes.patrol4, speed: 0.005 },
  { id: 't1', type: 'threat', name: 'Warning: Illegal Fishing Detected', route: routes.threat1, speed: 0.002 },
  { id: 't2', type: 'threat', name: 'Warning: Unidentified Vessel', route: routes.threat2, speed: 0.0025 },
  { id: 't3', type: 'threat', name: 'Warning: Border Violation', route: routes.threat3, speed: 0.002 },
  { id: 't4', type: 'threat', name: 'Warning: Smuggling Suspected', route: routes.threat4, speed: 0.003 },
];

const initialVesselStates = vesselsConfig.map(v => ({
  id: v.id,
  pos: v.route[0],
  idx: 1
}));

export default function MapComponent({ isTracking = true, isMonitoring = true }: MapComponentProps) {
  const [vessels, setVessels] = useState(initialVesselStates);
  const [pulseRadius, setPulseRadius] = useState(15);
  const stateRef = useRef(initialVesselStates.map(v => ({ ...v }))); // Deep copy

  // Realistic Vessel Movement Simulation
  useEffect(() => {
    if (!isTracking) return;

    const moveTowards = (current: [number, number], target: [number, number], speed: number): [[number, number], boolean] => {
      const dx = target[0] - current[0];
      const dy = target[1] - current[1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < speed) return [target, true]; // Reached waypoint
      const ratio = speed / dist;
      return [[current[0] + dx * ratio, current[1] + dy * ratio], false];
    };

    const interval = setInterval(() => {
      const newVessels = [...stateRef.current];
      
      newVessels.forEach((v) => {
        const config = vesselsConfig.find(vc => vc.id === v.id);
        if (!config) return;

        const [newPos, reached] = moveTowards(v.pos, config.route[v.idx], config.speed);
        v.pos = newPos;
        if (reached) {
          v.idx = (v.idx + 1) % config.route.length;
        }
      });

      stateRef.current = newVessels;
      // Copy array of objects for state
      setVessels(newVessels.map(v => ({ ...v })));
    }, 50); // 20fps for smooth movement

    return () => clearInterval(interval);
  }, [isTracking]);

  // AI Monitoring Radar Pulse Simulation
  useEffect(() => {
    if (!isMonitoring) {
      setPulseRadius(15);
      return;
    }
    let grow = true;
    const interval = setInterval(() => {
      setPulseRadius(prev => {
        if (prev >= 25) grow = false;
        if (prev <= 12) grow = true;
        return grow ? prev + 1.5 : prev - 1.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isMonitoring]);

  return (
    <MapContainer 
      center={[-2.5489, 118.0149]} 
      zoom={5} 
      className="w-full h-full rounded-2xl z-0"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
      />
      
      {/* Route Overlays */}
      {isMonitoring && vesselsConfig.map((config) => {
        let color = "rgba(255,255,255,0.2)";
        let dashArray = "5, 10";
        if (config.type === 'patrol') {
          color = "rgba(0, 229, 255, 0.3)";
          dashArray = "5, 5";
        } else if (config.type === 'threat') {
          color = "rgba(255, 59, 48, 0.3)";
        }
        
        return (
          <Polyline 
            key={`route-${config.id}`} 
            positions={config.route} 
            color={color} 
            weight={2} 
            dashArray={dashArray} 
          />
        );
      })}

      {/* Markers */}
      {vessels.map((v) => {
        const config = vesselsConfig.find(vc => vc.id === v.id);
        if (!config) return null;

        if (config.type === 'cargo') {
          return (
            <Marker key={v.id} position={v.pos} icon={icon}>
              <Popup>
                <div className="font-bold">{config.name}</div>
                <div className="text-xs text-gray-500">Status: Safe</div>
                <div className="text-xs text-gray-400 mt-1">Lat: {v.pos[0].toFixed(4)}, Lon: {v.pos[1].toFixed(4)}</div>
              </Popup>
            </Marker>
          );
        }

        if (config.type === 'patrol') {
          return (
             <CircleMarker key={v.id} center={v.pos} radius={8} color="#00E5FF" fillColor="#00E5FF" fillOpacity={0.5}>
               <Popup>
                <div className="font-bold text-primary-cyan">{config.name}</div>
                <div className="text-xs">Active patrol route</div>
                <div className="text-xs text-gray-400 mt-1">Lat: {v.pos[0].toFixed(4)}, Lon: {v.pos[1].toFixed(4)}</div>
               </Popup>
            </CircleMarker>
          );
        }

        if (config.type === 'threat') {
          return (
            <CircleMarker key={v.id} center={v.pos} radius={pulseRadius} color="#FF3B30" fillColor="#FF3B30" fillOpacity={0.4}>
               <Popup>
                <div className="font-bold text-red-500">{config.name}</div>
                <div className="text-xs">Intercepting...</div>
                <div className="text-xs text-gray-400 mt-1">Lat: {v.pos[0].toFixed(4)}, Lon: {v.pos[1].toFixed(4)}</div>
               </Popup>
            </CircleMarker>
          );
        }

        return null;
      })}
    </MapContainer>
  );
}
