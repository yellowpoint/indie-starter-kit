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
  Info,
  Copy
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [projectConfig, setProjectConfig] = useState({
    name: "",
    description: "",
    features: ""
  });

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("已复制到剪贴板");
    } catch (err) {
      toast.error("复制失败");
    }
  };

  const renderTaskContent = (task) => {
    switch (task.id) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-muted-foreground">{task.description}</p>
            <div className="flex items-center gap-2 p-4 bg-muted rounded-md">
              <code className="flex-1">{task.command}</code>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(task.command)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-muted-foreground">{task.description}</p>
            <div className="flex items-center gap-2 p-4 bg-muted rounded-md">
              <code className="flex-1">{task.command}</code>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(task.command)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-muted-foreground">{task.description}</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">项目名称</label>
                <Input
                  value={projectConfig.name}
                  onChange={(e) => setProjectConfig(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="输入项目名称..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">项目简介</label>
                <Textarea
                  value={projectConfig.description}
                  onChange={(e) => setProjectConfig(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="描述项目的主要功能和目标..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">核心特性</label>
                <Textarea
                  value={projectConfig.features}
                  onChange={(e) => setProjectConfig(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="列出项目的关键特性..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-muted-foreground">{task.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-4 bg-muted rounded-md">
                <code className="flex-1">{task.command}</code>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(task.command)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                提示：确保已经初始化 git 仓库并添加了远程源
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-muted-foreground">{task.description}</p>
            <Button asChild>
              <a href={task.link} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                前往 Vercel 部署
              </a>
            </Button>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-muted-foreground">{task.description}</p>
            <div className="space-y-2">
              {task.templates.map((template, index) => (
                <div key={index} className="flex items-center gap-2 p-4 bg-muted rounded-md">
                  <p className="flex-1">{template}</p>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(template)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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

        <Card className="p-6">
          {renderTaskContent(tasks.find(task => task.id === currentTask))}
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