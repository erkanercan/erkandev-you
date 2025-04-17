import { createStore } from "zustand";

export type IdentityPhrase = {
  id: string;
  emoji: string;
  text: string;
  vibe?: "chaotic" | "calm" | "weird" | "cozy" | "existential";
  rarity?: "common" | "rare" | "legendary";
};

const vibeThemes: Record<string, string> = {
  calm: "from-[#0a192f] via-[#1f3b67] to-[#30507d]", // deep ocean blues
  chaotic: "from-[#4b0000] via-[#8b1a1a] to-[#b33c3c]", // dark red lava
  cozy: "from-[#3b2c13] via-[#8a5a2d] to-[#d6a349]", // candlelight amber
  weird: "from-[#2e003e] via-[#7b1fa2] to-[#e940ff]", // cosmic fuchsia glow
  existential: "from-[#0d0d0d] via-[#2a2a2a] to-[#444]", // charcoal & fog
  choose: "from-[#200042] via-[#3a0967] to-[#6e14a3]", // mysterious purple
  start: "from-[#000000] via-[#1b1b1b] to-[#2c2c2c]", // neutral dark fade
};

export type PhraseStore = {
  phrases: IdentityPhrase[];
  currentCards: IdentityPhrase[];
  selectedCardIndex: number | null;
  mode: "start" | "choose" | "reveal";
  currentTheme: string; // Tailwind class string for bg
  setTheme: (theme: string) => void;
  setMode: (mode: PhraseStore["mode"]) => void;
  setSelectedCardIndex: (index: number | null) => void;
  loadPhrases: () => Promise<void>;
  shuffleCurrentCards: () => void;
  resetGame: () => void;
};

export const createPhraseStore = () => {
  return createStore<PhraseStore>()((set, get) => ({
    phrases: [],
    selectedCardIndex: null,
    mode: "start",
    currentCards: [],
    currentTheme: "from-black via-zinc-900 to-neutral-800",

    setTheme: (theme) => set({ currentTheme: theme }),

    setMode: (mode) => {
      const currentTheme =
        mode === "choose"
          ? vibeThemes["choose"] // choose theme
          : mode === "start"
          ? vibeThemes["start"] // start theme
          : get().currentTheme; // keep reveal theme
      set({ mode, currentTheme });
    },

    setSelectedCardIndex: (index) => {
      const card = index !== null ? get().currentCards[index] : null;
      const vibe = card?.vibe ?? "calm";
      const theme = vibeThemes[vibe] ?? vibeThemes["calm"];
      set({
        selectedCardIndex: index,
        mode: "reveal",
        currentTheme: theme,
      });
    },

    loadPhrases: async () => {
      const res = await fetch("/phrases.json");
      const data = (await res.json()) as IdentityPhrase[];
      const shuffled = shuffle(data);
      set({
        phrases: shuffled,
        currentCards: shuffled.slice(0, 4),
      });
    },

    shuffleCurrentCards: () => {
      const shuffledPhrases = shuffle(get().phrases);
      const currentCards = get().currentCards;
      const currentCardIds = new Set(currentCards.map((card) => card.id));
      const newCards = shuffledPhrases.filter(
        (card) => !currentCardIds.has(card.id)
      );
      const newCardsCount = Math.min(4 - currentCards.length, newCards.length);
      const newCardsToAdd = newCards.slice(0, newCardsCount);
      const updatedCards = [...currentCards, ...newCardsToAdd];
      set({ currentCards: updatedCards });
    },

    resetGame: () => {
      const shuffled = shuffle(get().phrases);
      set({
        phrases: shuffled,
        currentCards: shuffled.slice(0, 4),
        selectedCardIndex: null,
        mode: "start",
        currentTheme: "from-black via-zinc-900 to-neutral-800",
      });
    },
  }));
};

// Simple shuffle utility
function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.3);
}
