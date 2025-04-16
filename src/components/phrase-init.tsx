"use client";
import { useEffect } from "react";
import { usePhraseStore } from "./phrase-provider";

export default function PhraseInit() {
  const { loadPhrases } = usePhraseStore((state) => state);

  useEffect(() => {
    loadPhrases();
  }, [loadPhrases]);

  return null;
}
