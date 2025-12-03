// HeartbeatAnimation.jsx
// ------------------------------------------------------
// ECG pulse line animation that fills from left to right
// ------------------------------------------------------

import React from "react";
import { motion } from "framer-motion";

const HeartbeatAnimation = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="relative w-72 h-32">
        {/* ECG path */}
        <svg
          viewBox="0 0 240 60"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          {/* Background (transparent) line */}
          <motion.path
            d="M0 30 L40 30 L45 20 L50 40 L55 10 L60 30 L80 30 L85 25 L90 35 L95 30 L120 30 L125 20 L130 40 L135 15 L140 30 L160 30 L165 25 L170 35 L175 30 L200 30 L205 20 L210 40 L215 30 L240 30"
            stroke="rgba(168, 145, 205, 0.3)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Animated filling line */}
          <motion.path
            d="M0 30 L40 30 L45 20 L50 40 L55 10 L60 30 L80 30 L85 25 L90 35 L95 30 L120 30 L125 20 L130 40 L135 15 L140 30 L160 30 L165 25 L170 35 L175 30 L200 30 L205 20 L210 40 L215 30 L240 30"
            stroke="url(#gradient)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => {
              setTimeout(onComplete, 100);
            }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A891CD" stopOpacity="1" />
              <stop offset="100%" stopColor="#B8A0D8" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,145,205,0.4) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.3, opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default HeartbeatAnimation;
