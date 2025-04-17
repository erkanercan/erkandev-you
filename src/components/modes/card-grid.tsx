"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePhraseStore } from "../phrase-provider";
import { GameCard } from "../game-card";

const cardVariants = {
  initial: (i: number) => ({
    opacity: 0,
    y: 80,
    rotate: [-1, 2, -2, 4][i % 4],
    scale: 0.8,
  }),
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, type: "spring", stiffness: 200 },
  }),
  hover: {
    scale: 1.05,
    rotate: 0,
  },
};

export function CardGrid() {
  const { setMode, currentCards, setSelectedCardIndex } = usePhraseStore(
    (state) => state
  );

  const handleClick = (index: number) => {
    setSelectedCardIndex(index);
    setMode("reveal");
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      <AnimatePresence>
        {currentCards.map((phrase, i) => (
          <motion.div
            key={phrase.id}
            custom={i}
            initial="initial"
            animate="animate"
            whileHover="hover"
            exit={{ opacity: 0 }}
            variants={cardVariants}
            className="cursor-pointer"
            onClick={() => handleClick(i)}
          >
            {/* Game Card - Always showing BACK in selection grid */}
            <GameCard
              emoji={phrase.emoji}
              text={phrase.text}
              rarity={phrase.rarity}
              forceBack // new prop, always show back side in CardGrid
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
