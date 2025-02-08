"use client";

import { motion } from "framer-motion";
import { WordCloud } from "@/components/word-cloud";

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">跨越不可能</h1>
        <p className="text-muted-foreground">
          探索学习、创造力与心流的交织之旅
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-xl border bg-card p-6"
      >
        <h2 className="text-xl font-semibold mb-4">核心概念</h2>
        <WordCloud />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center text-muted-foreground"
      >
        <p>
          通过学习提升能力，用创造力开拓方向，在心流中突破自我。
          <br />
          让我们一起探索成长的无限可能。
        </p>
      </motion.div>
    </div>
  );
} 