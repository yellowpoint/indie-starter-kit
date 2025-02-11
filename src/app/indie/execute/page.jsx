"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Download,
  Code,
  FileEdit,
  Github,
  Globe,
  Share2,
  Info
} from "lucide-react";
import Link from "next/link";

const tasks = [
  {
    id: 1,
    title: "下载项目模板",
    icon: Download,
    description: "获取基础项目模板",
    command: "git clone https://github.com/your-username/indie-starter-template.git"
  },
  {
    id: 2,
    title: "启动编辑器",
    icon: Code,
    description: "使用 VS Code 打开项目",
    command: "code indie-starter-template"
  },
  {
    id: 3,
    title: "项目配置",
    icon: FileEdit,
    description: "设置项目名称和简介",
    fields: ["项目名称", "项目简介", "关键特性"]
  },
  {
    id: 4,
    title: "Github 部署",
    icon: Github,
    description: "创建仓库并推送代码",
    command: "git push origin main"
  },
  {
    id: 5,
    title: "Vercel 部署",
    icon: Globe,
    description: "部署到 Vercel 平台",
    link: "https://vercel.com/new"
  },
  {
    id: 6,
    title: "发布分享",
    icon: Share2,
    description: "分享到社交媒体",
    templates: [
      "🚀 我刚刚完成了一个新项目：[项目名称]",
      "💡 解决了[什么问题]",
      "🔗 项目地址：[URL]",
      "欢迎体验反馈！"
    ]
  }
];

export default function ExecutePage() {
  const [currentTask, setCurrentTask] = useState(1);

  return (
    <div className="container mx-auto p-6 grid grid-cols-[1fr_300px] gap-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">项目执行</h1>
          <Button variant="outline" asChild>
            <Link href="/indie/plan">
              <Info className="h-4 w-4 mr-2" />
              详细规划
            </Link>
          </Button>
        </div>

        {/* 主要内容区域 */}
        <Card className="p-6">
          {/* 根据 currentTask 显示相应的任务内容 */}
        </Card>
      </div>

      {/* 右侧任务列表 */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`p-4 cursor-pointer ${currentTask === task.id ? "border-primary" : ""
              }`}
            onClick={() => setCurrentTask(task.id)}
          >
            <div className="flex items-center gap-3">
              <task.icon className="h-5 w-5" />
              <div>
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-muted-foreground">
                  {task.description}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 