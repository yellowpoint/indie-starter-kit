"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, HelpCircle, Target, Clock, Rocket, Zap } from "lucide-react";

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

const selfDoubtGuide = {
  cognition: {
    title: "认知重塑",
    description: `为什么"自我怀疑"反而是优势`,
    items: [
      {
        title: "早期粗糙是必然的",

        example: "Instagram最初是复杂的签到应用Burbn",
        detail: "把你的v0.1视为探针，而非最终形态"
      },
      {
        title: "需求模糊是发现机会的信号",
        example: "VS Code通过插件生态满足涌现需求",
        detail: "从满足明确需求转向构建需求涌现平台"
      },

      {
        title: "竞品存在证明市场有效",
        example: "72%成功产品并非行业首创",
        detail: "只要有10%体验提升，用户就有迁移可能"
      }
    ]
  },
  validation: {
    title: "需求验证四步法",
    steps: [
      {
        name: "痛苦日志",
        description: "连续7天记录挫败时刻",
        action: "找出频率≥3次的问题"
      },
      {
        name: "需求暴力测试",
        description: "验证支付意愿与差异化",
        action: "收集预付款与差评分析"
      },
      {
        name: "反脆弱MVP",
        description: "最低成本测试核心假设",
        action: "留存率>50%或付费率>3%"
      },
      {
        name: "用户共谋计划",
        description: "招募5个种子用户",
        action: "提供特权换取深度反馈"
      }
    ]
  },
  competition: {
    title: "对抗竞品焦虑",
    strategies: [
      {
        name: "竞品解剖术",
        description: "找到产品的失语区",
        steps: ["深度使用竞品", "记录沉默时刻", "攻击盲点"]

      },
      {
        name: "寄生虫策略",
        description: "借势巨头生态成长",
        examples: ["开发Figma插件", "做Prompt工具"]
      },
      {
        name: "低端颠覆模型",
        description: "服务够用就好用户",
        example: "Zoom对标Skype的崛起"
      }

    ]
  },
  actionPlan: {
    title: "48小时自救计划",
    days: [
      {
        title: "Day 1：需求暴力验证",
        schedule: [
          "09:00-12:00 写痛苦日志",
          "14:00-18:00 手动模拟方案",
          "20:00-22:00 招募测试用户"
        ]
      },
      {
        title: "Day 2：MVP构建",
        schedule: [
          "09:00-12:00 构建原型",
          "14:00-17:00 用户测试",
          "19:00-21:00 发布产品"
        ]
      }
    ]
  }
};

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full p-2 bg-blue-500 bg-opacity-10">
              <Brain className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">{selfDoubtGuide.cognition.title}</h2>
          </div>
          <div className="space-y-6">
            {selfDoubtGuide.cognition.items.map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.example}</p>
                <p className="text-sm bg-muted p-3 rounded-lg">{item.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full p-2 bg-green-500 bg-opacity-10">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">{selfDoubtGuide.validation.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {selfDoubtGuide.validation.steps.map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-muted w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <h3 className="font-medium">{step.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                <p className="text-sm bg-muted p-2 rounded-lg">{step.action}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full p-2 bg-yellow-500 bg-opacity-10">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">{selfDoubtGuide.actionPlan.title}</h2>
          </div>
          <div className="space-y-6">
            {selfDoubtGuide.actionPlan.days.map((day, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-medium">{day.title}</h3>
                <div className="space-y-2">
                  {day.schedule.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
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