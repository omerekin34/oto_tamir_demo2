"use client";

import { motion } from "framer-motion";

export function AppointmentFade({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      className="bg-zinc-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
