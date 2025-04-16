"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePhraseStore } from "../phrase-provider";

export function StartScreen() {
  const { setMode } = usePhraseStore((state) => state);

  return (
    <motion.div
      className="text-center space-y-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Who are you today?
      </motion.h1>

      <motion.p
        className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Click the button below to draw your daily identity from the cosmic deck.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          size="lg"
          onClick={() => setMode("choose")}
          className="text-lg px-8 py-6 shadow-md hover:scale-105 transition-transform"
        >
          Reveal my cards ✨
        </Button>
      </motion.div>
    </motion.div>
  );
}
