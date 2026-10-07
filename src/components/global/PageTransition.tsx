"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [snapshot, setSnapshot] = useState({ path: pathname, node: children });

  useEffect(() => {
    setSnapshot({ path: pathname, node: children });
  }, [pathname, children]);

  const visible = snapshot.path === pathname ? children : snapshot.node;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={snapshot.path}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {visible}
      </motion.div>
    </AnimatePresence>
  );
}
