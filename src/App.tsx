/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Starfield } from './components/Starfield';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Starfield />
      </div>

      {/* Atmospheric Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#050505_100%)] opacity-80" />

      {/* Immersive UI Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl pointer-events-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-6 font-display" style={{ textShadow: '0 0 40px rgba(0, 216, 255, 0.3)' }}>
            Explore the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d8ff] to-[#8a2be2]">Cosmos</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-400 font-light mb-10 max-w-2xl mx-auto tracking-wide">
            Experience a 60fps GPU-accelerated journey through the stars, powered by React Three Fiber and Node.js.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 216, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium tracking-widest uppercase text-sm transition-colors hover:bg-white/20"
          >
            Initialize Sequence
          </motion.button>
        </motion.div>
      </div>

      {/* Footer details */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-between px-12 text-xs font-mono text-gray-500 uppercase tracking-widest pointer-events-none">
        <span>SYS.STATUS: ONLINE</span>
        <span>FPS: 60.00</span>
      </div>
    </div>
  );
}
