"use client";

import { StartScreen } from "@/components/modes/start-screen";
import { CardGrid } from "@/components/modes/card-grid";
import { RevealView } from "@/components/modes/reveal-view";
import PhraseInit from "@/components/phrase-init";
import { usePhraseStore } from "@/components/phrase-provider";
import AnimatedBackground from "@/components/animated-background";

export default function HomePage() {
  const { mode } = usePhraseStore((state) => state);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <AnimatedBackground />

      <PhraseInit />

      {mode === "start" && <StartScreen />}
      {mode === "choose" && <CardGrid />}
      {mode === "reveal" && <RevealView />}
    </main>
  );
}
