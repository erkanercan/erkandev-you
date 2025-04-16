"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePhraseStore } from "../phrase-provider";

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
            className="rounded-xl flex items-center justify-center text-5xl text-white cursor-pointer border border-white/10 shadow-md transition-shadow hover:shadow-[0_0_24px_3px_rgba(147,51,234,0.5)]"
            onClick={() => handleClick(i)}
          >
            <Image
              src="/card-back.png"
              alt="Card back"
              width={200}
              height={300}
              className="w-full h-full object-cover rounded-xl"
              priority
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
