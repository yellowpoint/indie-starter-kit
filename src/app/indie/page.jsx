"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Lightbulb,
  Sparkles,
  Wrench,
  CheckSquare,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const modules = [
  {
    title: "心态指南",
    description: "调整心态,建立正确的独立开发思维模式",
    icon: Brain,
    color: "bg-purple-500",
    url: "/indie-starter/mindset",
    highlights: [
      "完成比完美更重要",
      "竞争是伪命题",
      "能力是动词"
    ]
  },
  {
    title: "策略库",
    description: "验证想法,找到适合的切入点",
    icon: Lightbulb,
    color: "bg-yellow-500",
    url: "/indie-starter/strategy",
    highlights: [
      "三步验证法",
      "差异化策略选择器",
      "预销售测试"
    ]
  },
  {
    title: "项目灵感库",
    description: "发现机会,获取可执行的项目思路",
    icon: Sparkles,
    color: "bg-blue-500",
    url: "/indie-starter/ideas",
    highlights: [
      "工具类项目",
      "内容变现",
      "垂直SaaS"
    ]
  },
  {
    title: "工具包",
    description: "快速开发,降低启动门槛",
    icon: Wrench,
    color: "bg-green-500",
    url: "/indie-starter/toolkit",
    highlights: [
      "开发工具",
      "设计资源",
      "营销渠道"
    ]
  },
  {
    title: "进度追踪",
    description: "48小时行动清单",
    icon: CheckSquare,
    color: "bg-red-500",
    url: "/indie-starter/progress",
    highlights: [
      "选方向",
      "建MVP",
      "找用户"
    ]
  }
];

export default function IndieStarterPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">独立开发启动器</h1>
        <p className="text-xl text-muted-foreground">
          48小时,从0到1启动你的独立开发之旅
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => (
          <Link href={module.url} key={module.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`rounded-full p-2 ${module.color} bg-opacity-10`}>
                    <module.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold">{module.title}</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  {module.description}
                </p>
                <ul className="space-y-2">
                  {module.highlights.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <ChevronRight className="h-4 w-4" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Button variant="outline" className="gap-2">
          <ExternalLink className="h-4 w-4" />
          查看成功案例
        </Button>
      </motion.div>
    </div>
  );
} 