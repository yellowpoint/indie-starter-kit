"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  GitBranch,
  ExternalLink,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

const strategies = [
  {
    title: "三步验证法",
    steps: [
      {
        name: "痛点挖掘",
        description: "分析应用商店差评,发现用户真实需求",
        action: "打开 AppFollow",
        link: "https://appfollow.io"
      },
      {
        name: "MVP构建",
        description: "使用模板快速构建最小可用产品",
        action: "查看代码模板",
        link: "https://github.com/topics/mvp-template"
      },
      {
        name: "预销售测试",
        description: "通过落地页验证用户付费意愿",
        action: "创建落地页",
        link: "https://carrd.co"
      }
    ]
  },
  {
    title: "差异化策略选择器",
    conditions: [
      {
        scenario: "竞品强 + 用户抱怨多",
        strategy: "解构创新：抽取单一功能极致化",
        examples: ["Linear vs. Jira", "Raycast vs. Spotlight"]
      },
      {
        scenario: "市场新 + 需求模糊",
        strategy: "捆绑创新：组合多个工具解决完整流程",
        examples: ["Notion = 文档 + 数据库 + 协作"]
      },
      {
        scenario: "技术门槛高",
        strategy: "降维创新：通过更简单的方式解决问题",
        examples: ["Webflow vs. 传统开发", "Airtable vs. Excel"]
      }
    ]
  }
];

export default function StrategyPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">策略库</h1>
        <p className="text-muted-foreground">
          验证想法,找到适合的切入点
        </p>
      </motion.div>

      {/* 三步验证法 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full p-2 bg-yellow-500 bg-opacity-10">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">{strategies[0].title}</h2>
          </div>

          <div className="space-y-6">
            {strategies[0].steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="rounded-full bg-muted w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium">{step.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={step.link} target="_blank" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      {step.action}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* 差异化策略选择器 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full p-2 bg-blue-500 bg-opacity-10">
              <GitBranch className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">{strategies[1].title}</h2>
          </div>

          <div className="space-y-6">
            {strategies[1].conditions.map((condition, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {condition.scenario}
                </div>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="font-medium">{condition.strategy}</p>
                  <div className="text-sm text-muted-foreground">
                    {condition.examples.map((example, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 