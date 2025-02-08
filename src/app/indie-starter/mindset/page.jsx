"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, HelpCircle } from "lucide-react";

const mindsetTips = [
  {
    title: "完成比完美更重要",
    description: "GitHub第一个版本只是Ruby脚本",
    detail: "不要追求完美主义,先完成一个最小可用版本。记住:发布的产品总比完美的计划更有价值。"
  },
  {
    title: "竞争是伪命题",
    description: "Notion入场时已有Evernote",
    detail: "市场足够大,关键是找到自己的差异化定位。已有竞品证明市场存在,这是好事。"
  },
  {
    title: "能力是动词",
    description: "所有开发者都曾边Google边写代码",
    detail: "不要等到完全准备好才开始。做中学,学中做,这是最快的进步方式。"
  }
];

const dailyQuestions = [
  "今天我可以容忍哪个不完美？",
  "如果只有24小时,我会先做什么？",
  "这个功能真的是必需的吗？",
  "用户真正的痛点是什么？"
];

export default function MindsetPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">心态指南</h1>
        <p className="text-muted-foreground">
          调整心态,建立正确的独立开发思维模式
        </p>
      </motion.div>

      <div className="space-y-6">
        {mindsetTips.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full p-2 bg-purple-500 bg-opacity-10">
                  <Brain className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">{tip.title}</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                {tip.description}
              </p>
              <p className="text-sm bg-muted p-4 rounded-lg">
                {tip.detail}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full p-2 bg-yellow-500 bg-opacity-10">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">每日自我提问</h2>
          </div>
          <div className="space-y-4">
            {dailyQuestions.map((question, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-muted rounded-lg"
              >
                <MessageCircle className="h-4 w-4" />
                <p>{question}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 