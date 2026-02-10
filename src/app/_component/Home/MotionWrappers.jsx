"use client";
import React from "react";
import { motion } from "framer-motion";

// Staggered Fade In for Lists/Grids
export const MotionStagger = ({ children, className = "", delay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MotionItem = ({ children, className = "" }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}


// Slide In (Left/Right/Up/Down)
export const MotionSlide = ({ children, direction = "up", className = "", delay = 0 }) => {
  const getVariants = () => {
    switch (direction) {
      case "left": return { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } };
      case "right": return { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } };
      case "down": return { hidden: { opacity: 0, y: -50 }, show: { opacity: 1, y: 0 } };
      case "up": 
      default: return { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

//  Scale Up / Zoom In
export const MotionScale = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "backOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
