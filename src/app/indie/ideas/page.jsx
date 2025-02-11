"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Wrench,
  BookOpen,
  Cloud,
  ArrowRight,
  ExternalLink,
  DollarSign
} from "lucide-react";
import Link from "next/link";

const projectTypes = [
  {
    title: "工具类",
    icon: Wrench,
    color: "bg-blue-500",
    description: "浏览器插件/CLI工具/桌面应用",
    ideas: [
      {
        name: "代码片段管理器",
        path: "浏览器插件 → 一键保存代码 → GitHub Gist集成",
        revenue: "订阅制 $5/月",
        example: "https://www.cacher.io"
      },
      {
        name: "开发环境配置工具",
        path: "CLI工具 → 模板选择 → 自动安装依赖",
        revenue: "开源+付费模板",
        example: "https://github.com/topics/dev-setup"
      }
    ]
  },
  {
    title: "内容变现",
    icon: BookOpen,
    color: "bg-green-500",
    description: "电子书/课程/模板/组件",
    ideas: [
      {
        name: "Next.js项目模板",
        path: "基础模板 → 主题定制 → 完整解决方案",
        revenue: "模板市场 $49起",
        example: "https://themeforest.net"
      },
      {
        name: "全栈开发教程",
        path: "免费内容 → 付费课程 → 社群服务",
        revenue: "课程售卖 $99起",
        example: "https://www.newline.co"
      }
    ]
  },
  {
    title: "垂直SaaS",
    icon: Cloud,
    color: "bg-purple-500",
    description: "针对特定行业的小型系统",
    ideas: [
      {
        name: "独立开发者CRM",
        path: "用户管理 → 收入追踪 → 自动化营销",
        revenue: "基础版$15/月",
        example: "https://www.lemonsqueezy.com"
      },
      {
        name: "设计师项目管理",
        path: "项目看板 → 文件共享 → 客户反馈",
        revenue: "团队版$29/月起",
        example: "https://www.notion.so"
      }
    ]
  }
];

export default function IdeasPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">项目灵感库</h1>
        <p className="text-muted-foreground">
          发现机会,获取可执行的项目思路
        </p>
      </motion.div>

      <div className="space-y-8">
        {projectTypes.map((type, index) => (
          <motion.div
            key={type.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`rounded-full p-2 ${type.color} bg-opacity-10`}>
                  <type.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{type.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {type.ideas.map((idea, i) => (
                  <div key={i} className="bg-muted p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{idea.name}</h3>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={idea.example} target="_blank" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          查看案例
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="h-4 w-4" />
                      {idea.path}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      {idea.revenue}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 