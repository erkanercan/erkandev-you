"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePhraseStore } from "./phrase-provider";

export default function AnimatedBackground() {
  const { currentTheme } = usePhraseStore((state) => state);
  const [prevTheme, setPrevTheme] = useState(currentTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (currentTheme !== prevTheme) {
      setIsTransitioning(true);
      const timeout = setTimeout(() => {
        setPrevTheme(currentTheme);
        setIsTransitioning(false);
      }, 800); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [currentTheme, prevTheme]);

  return (
    <>
      {/* Bottom Layer (always showing previous theme) */}
      <div
        className={`absolute inset-0 -z-20 bg-gradient-to-tr ${prevTheme} transition-none`}
      />

      {/* Top Layer (fades in with current theme) */}
      {isTransitioning && (
        <motion.div
          className={`absolute inset-0 -z-10 bg-gradient-to-tr ${currentTheme}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
    </>
  );
}
