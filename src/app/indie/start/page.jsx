"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";

const projectIdeas = [
  "一个帮助开发者管理代码片段的工具",
  "独立开发者的项目管理系统",
  "程序员的时间管理助手",
  "开发环境快速配置工具",
  "代码注释生成器",
  // 添加更多想法...
];

export default function StartPage() {
  const [idea, setIdea] = useState("");
  const router = useRouter();

  const handleRandomIdea = () => {
    const randomIndex = Math.floor(Math.random() * projectIdeas.length);
    setIdea(projectIdeas[randomIndex]);
  };

  const handleStart = () => {
    if (!idea.trim()) {
      toast.error("请输入项目想法");
      return;
    }
    // 存储项目想法到 localStorage 或其他状态管理
    localStorage.setItem("currentProjectIdea", idea);
    router.push("/indie/execute");
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