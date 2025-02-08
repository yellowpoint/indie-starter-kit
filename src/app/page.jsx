"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Brain,
  Lightbulb,
  Sparkles,
  Wrench,
  CheckSquare,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "心态指南",
    description: "调整心态,建立正确的独立开发思维模式",
    icon: Brain,
    color: "bg-purple-500",
    href: "/indie-starter/mindset"
  },
  {
    title: "策略库",
    description: "验证想法,找到适合的切入点",
    icon: Lightbulb,
    color: "bg-yellow-500",
    href: "/indie-starter/strategy"
  },
  {
    title: "项目灵感库",
    description: "发现机会,获取可执行的项目思路",
    icon: Sparkles,
    color: "bg-blue-500",
    href: "/indie-starter/ideas"
  },
  {
    title: "工具包",
    description: "快速开发,降低启动门槛",
    icon: Wrench,
    color: "bg-green-500",
    href: "/indie-starter/toolkit"
  },
  {
    title: "进度追踪",
    description: "48小时行动清单",
    icon: CheckSquare,
    color: "bg-red-500",
    href: "/indie-starter/progress"
  }
];

const highlights = [
  "完成比完美更重要",
  "竞争是伪命题",
  "能力是动词",
  "从小切入",
  "快速验证",
  "持续迭代"
];

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Rocket className="h-8 w-8" />
          <h1 className="text-4xl font-bold">独立开发启动器</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          48小时从0到1启动你的独立开发之旅
        </p>
      </motion.div>

      {/* 核心特性 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <Link href={feature.href} key={feature.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group rounded-xl border bg-card p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`rounded-full p-2 ${feature.color} bg-opacity-10`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </h2>
              </div>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* 核心理念 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl border bg-card p-6"
      >
        <h2 className="text-xl font-semibold mb-4">核心理念</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight, index) => (
            <div
              key={highlight}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <ArrowRight className="h-4 w-4 text-primary" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 开始行动 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center"
      >
        <Button asChild size="lg">
          <Link href="/indie-starter/mindset">
            开始行动
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
} 