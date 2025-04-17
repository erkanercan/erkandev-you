"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePhraseStore } from "../phrase-provider";
import { GameCard } from "../game-card";

export function RevealView() {
  const { phrases, selectedCardIndex, resetGame } = usePhraseStore(
    (state) => state
  );

  const phrase = selectedCardIndex !== null ? phrases[selectedCardIndex] : null;

  if (!phrase) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Today I am: ${phrase.text}`);
    toast.success("Copied to clipboard!");
  };

  const handleReset = () => {
    resetGame();
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Title */}
      <motion.h1
        className="text-4xl sm:text-6xl text-center font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Today you are:
      </motion.h1>

      {/* Card Container */}
      <motion.div
        className="w-64 h-[400px] relative perspective"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Render FantasyCard here */}
        <GameCard
          emoji={phrase.emoji}
          text={phrase.text.charAt(0).toUpperCase() + phrase.text.slice(1)}
          rarity={phrase.rarity}
        />
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Button className="cursor-pointer" onClick={handleCopy}>
          Copy
        </Button>
        <Button className="cursor-pointer" onClick={handleReset}>
          Try Again 🔁
        </Button>
      </motion.div>
    </div>
  );
}
