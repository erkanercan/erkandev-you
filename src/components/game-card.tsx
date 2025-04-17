"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import posthog from "posthog-js";

type CardProps = {
  emoji: string;
  text: string;
  rarity?: "common" | "rare" | "legendary";
  forceBack?: boolean;
};

export function GameCard({
  emoji,
  text,
  rarity = "common",
  forceBack = false,
}: CardProps) {
  const [flipped, setFlipped] = useState(false);

  const isFlipped = forceBack ? true : flipped;

  return (
    <div
      onClick={() => {
        if (!flipped) return;
        if (!forceBack) setFlipped(!flipped);
        posthog.capture("card_flipped", {
          rarity: rarity,
          emoji: emoji,
          text: text,
        });
      }}
      className="relative w-64 h-[400px] cursor-pointer perspective select-none"
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden]">
          {/* Beautiful front image */}
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('/card-f.png')", // your front png
            }}
          />

          {/* Magical Moving Outline */}
          {(rarity === "rare" || rarity === "legendary") && (
            <div className="absolute inset-0 rounded-2xl pointer-events-none z-10">
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl border-2 opacity-70 animate-glow-border",
                  rarity === "rare" && "border-cyan-400",
                  rarity === "legendary" && "border-yellow-400"
                )}
              />
            </div>
          )}

          {/* Magic Circle Area with soft background */}
          <div className="absolute top-[47%] left-1/2 w-32 h-32 rounded-full bg-black/40 backdrop-blur-md -translate-x-1/2 -translate-y-1/2 border border-purple-400 opacity-70" />

          {/* Emoji */}
          <motion.div
            className="absolute top-[47%] left-1/2 text-7xl drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] z-10 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
          >
            {emoji}
          </motion.div>

          {/* Textbox */}
          <motion.p
            className="absolute bottom-[20%] left-1/2 w-[60%] text-white text-sm text-center leading-relaxed drop-shadow-[0_0_5px_rgba(0,0,0,0.7)] z-10 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {text}
          </motion.p>
        </div>

        {/* BACK SIDE */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] rotate-y-180",
            rarity === "rare" && "shadow-[0_0_60px_10px_rgba(0,255,255,0.4)]",
            rarity === "legendary" &&
              "shadow-[0_0_80px_15px_rgba(255,215,0,0.6)]",
            "shadow-[0_0_40px_8px_rgba(148,0,211,0.2)]"
          )}
        >
          {/* Beautiful card back image */}
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('/card-b.png')", // <- Your new back PNG
            }}
          />

          {/* Sparkles */}
          <div className="absolute inset-0">
            <div className="absolute w-2 h-2 bg-white rounded-full top-[20%] left-[30%] opacity-50 animate-float-pulse"></div>
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-[60%] left-[70%] opacity-30 animate-float-pulse2"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full top-[40%] left-[50%] opacity-40 animate-float-pulse3"></div>
          </div>

          {/* Soft center glow */}
          <div className="absolute top-1/2 left-1/2 w-44 h-44 bg-purple-500 opacity-20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
