"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { rarityShadow } from "@/lib/constants";
import { usePhraseStore } from "../phrase-provider";

export function RevealView() {
  const { phrases, selectedCardIndex, resetGame } = usePhraseStore(
    (state) => state
  );

  const [flipped, setFlipped] = useState(false);

  const phrase = selectedCardIndex !== null ? phrases[selectedCardIndex] : null;

  useEffect(() => {
    const timeout = setTimeout(() => setFlipped(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (!phrase) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(phrase.text);
    toast.success("Copied to clipboard!");
  };

  const handleReset = () => {
    setFlipped(false);
    resetGame();
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Today you are:
      </motion.h1>
      {/* Card Container */}
      <motion.div
        className="w-72 h-[450px] relative perspective"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className={cn(
            "absolute inset-0 rounded-xl border border-white/10 shadow-lg [transform-style:preserve-3d] transition-shadow duration-500",
            flipped && rarityShadow[phrase.rarity ?? "common"] // Apply shadow based on rarity
          )}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back face */}
          <div className="absolute inset-0 flex items-center justify-center text-5xl backface-hidden">
            <Image
              src="/card-back.png"
              alt="Card back"
              width={200}
              height={300}
              className="w-full h-full object-cover rounded-xl"
              priority
            />
          </div>

          {/* Front face */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            {/* Card image */}
            <Image
              src="/card-front.png"
              alt="Card front"
              fill
              className="object-cover rounded-xl"
              priority
            />

            {/* Overlay content */}
            <>
              {/* Emoji layer */}
              <motion.div
                className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] z-10"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {phrase.emoji}
              </motion.div>

              {/* Text layer */}
              <motion.p
                className="absolute bottom-[30%] h-[70px] left-1/2 -translate-x-1/2 w-[50%] text-sm leading-relaxed text-white text-center drop-shadow-[0_0_4px_rgba(0,0,0,0.5)] z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {
                  // Make first letter of the phrase text uppercase
                  phrase.text.charAt(0).toUpperCase() + phrase.text.slice(1)
                }
              </motion.p>
            </>
          </div>
        </motion.div>
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
