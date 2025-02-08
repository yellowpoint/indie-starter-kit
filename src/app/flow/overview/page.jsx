"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Heart, Target, Compass } from "lucide-react";
import Image from "next/image";
import { VisualNotes } from "@/components/visual-notes";
import { flowSystem } from "@/config/visual-notes/flow-system";

const flowElements = [
  {
    title: "2.控制意识",
    description: "理解意识的本质与如何掌控它",
    icon: Brain,
    color: "bg-purple-500",
    url: "/flow/consciousness",
    position: "absolute left-0 top-20",
    highlights: [
      "意识是可感知可引导的事件",
      "注意力决定意识内容",
      "资讯中性，阐释决定好坏"
    ]
  },
  {
    title: "1.为什么不快乐",
    description: "探索现代人普遍不快乐的深层原因",
    icon: Heart,
    color: "bg-red-500",
    url: "/flow/why-not-happy",
    position: "absolute left-0 top-1/2 -translate-y-1/2",
    highlights: [
      "宇宙不以人类为中心",
      "快乐源于心灵对体验的阐释",
      "控制意识才能控制体验"
    ]
  },
  {
    title: "3.心流要素",
    description: "心流状态的关键组成部分",
    icon: Target,
    color: "bg-blue-500",
    url: "/flow/flow-elements",
    position: "absolute right-0 top-80",
    highlights: [
      "全神贯注 + 自我进步",
      "明确目标、适度挑战",
      "即时反馈、沉浸感"
    ]
  },
  {
    title: "4.如何找目标",
    description: "设定合适目标的方法论",
    icon: Compass,
    color: "bg-green-500",
    url: "/flow/find-target",
    position: "absolute right-0 bottom-20",
    highlights: [
      "精简目标减少冲突",
      "找到真正重要的事",
      "平衡挑战与能力"
    ]
  }
];

export default function FlowOverviewPage() {
  return (
    <div className="container mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">心流系统</h1>
          <p className="text-xl text-muted-foreground">
            通过理解和掌控意识，找到适合的目标，进入心流状态，最终达到持续的快乐。
          </p>
        </div>

        {/* 添加视觉笔记组件 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border bg-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4">系统概览</h2>
          <VisualNotes config={flowSystem} />
        </motion.div>

        {/* 中心图形和卡片布局 */}
        <div className="relative mx-auto aspect-square max-w-3xl">
          {/* 中心小人图形 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative h-full w-full"
          >
            <Image
              src="/images/flow-figure.svg"
              alt="Flow System Figure"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* 卡片 */}
          {flowElements.map((element, index) => (
            <Link href={element.url} key={element.title}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`${element.position} w-64 group`}
              >
                <div className={`
                  rounded-xl border bg-card p-4 shadow-lg
                  transition-all duration-300
                  group-hover:scale-105 group-hover:shadow-xl
                  ${element.color} bg-opacity-10
                `}>
                  <div className="flex items-center gap-3 mb-2">
                    <element.icon className="h-5 w-5" />
                    <h3 className="font-medium">{element.title}</h3>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {element.highlights.map((point, i) => (
                      <li key={i} className="list-disc list-inside">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* 底部总结 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mx-auto max-w-2xl rounded-xl border bg-card p-6 text-center"
        >
          <p className="text-lg text-muted-foreground">
            心流不是逃避现实，而是更深入地参与生活。
            <br />
            通过理解意识、设定目标、保持专注，
            <br />
            我们能在日常生活中找到持续的快乐与满足。
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 