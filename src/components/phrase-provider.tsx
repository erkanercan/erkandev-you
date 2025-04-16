"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type PhraseStore, createPhraseStore } from "@/lib/stores/phrase-store";

export type PhraseStoreApi = ReturnType<typeof createPhraseStore>;

export const PhraseStoreContext = createContext<PhraseStoreApi | undefined>(
  undefined
);

export interface PhraseStoreProviderProps {
  children: ReactNode;
}

export const PhraseStoreProvider = ({ children }: PhraseStoreProviderProps) => {
  const storeRef = useRef<PhraseStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createPhraseStore();
  }

  return (
    <PhraseStoreContext.Provider value={storeRef.current}>
      {children}
    </PhraseStoreContext.Provider>
  );
};

export const usePhraseStore = <T,>(selector: (store: PhraseStore) => T): T => {
  const phraseStoreContext = useContext(PhraseStoreContext);

  if (!phraseStoreContext) {
    throw new Error(`usePhraseStore must be used within PhraseStoreProvider`);
  }

  return useStore(phraseStoreContext, selector);
};
