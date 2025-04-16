import { createStore } from "zustand";

export type IdentityPhrase = {
  id: string;
  emoji: string;
  text: string;
  vibe?: "chaotic" | "calm" | "weird" | "cozy" | "existential";
  rarity?: "common" | "rare" | "legendary";
};

export type PhraseStore = {
  phrases: IdentityPhrase[];
  currentCards: IdentityPhrase[];
  selectedCardIndex: number | null;
  mode: "start" | "choose" | "reveal";
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
    mode: "start" as PhraseStore["mode"],
    currentCards: [],

    setMode: (mode) => set({ mode }),
    setSelectedCardIndex: (index) => set({ selectedCardIndex: index }),
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
      set({ selectedCardIndex: null, mode: "start" });
      const shuffled = shuffle(get().phrases);
      set({
        phrases: shuffled,
        currentCards: shuffled.slice(0, 4),
        selectedCardIndex: null,
        mode: "start",
      });
    },
  }));
};

// Simple shuffle utility
function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.3);
}
