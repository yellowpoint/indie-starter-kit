"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import { projectStorage } from "@/lib/storage";
import { toast } from "sonner";

const projectIdeas = [
  "一个帮助开发者管理代码片段的工具",
  "独立开发者的项目管理系统",
  "程序员的时间管理助手",
  "开发环境快速配置工具",
  "代码注释生成器",
  "API 文档自动生成工具",
  "开发者工作流自动化工具",
  "技术博客生成器",
  "代码review助手",
  "开源项目数据分析工具"
];

export default function StartPage() {
  const [idea, setIdea] = useState("");
  const router = useRouter();

  const handleRandomIdea = () => {
    const randomIndex = Math.floor(Math.random() * projectIdeas.length);
    setIdea(projectIdeas[randomIndex]);
  };

  const handleStart = async () => {
    if (!idea.trim()) {
      toast.error("请输入项目想法");
      return;
    }

    try {
      // 创建新项目
      const newProject = {
        id: Date.now(),
        name: idea,
        startDate: new Date().toISOString().split('T')[0],
        progress: 0,
        excitement: 3,
        difficulty: 3,
        status: "未开始"
      };

      // 获取现有项目列表
      const existingProjects = await projectStorage.getAll();

      // 添加新项目
      await projectStorage.save([...existingProjects, newProject]);

      // 设置为当前项目
      await projectStorage.setCurrentProject(newProject);

      // 存储项目想法到 localStorage
      localStorage.setItem("currentProjectIdea", idea);

      toast.success("项目创建成功");
      router.push("/indie/execute");
    } catch (error) {
      console.error("创建项目失败:", error);
      toast.error("创建项目失败，请重试");
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 text-center"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl">我想做</span>
          <Input
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-[400px]"
            placeholder="输入你的项目想法..."
            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
          />
          <Button variant="outline" onClick={handleRandomIdea}>
            <Shuffle className="h-4 w-4 mr-2" />
            随机想法
          </Button>
        </div>

        <Button size="lg" onClick={handleStart}>
          开始项目
        </Button>
      </motion.div>
    </div>
  );
} 