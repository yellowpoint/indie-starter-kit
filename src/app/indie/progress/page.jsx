"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckSquare,
  Trophy,
  Timer,
  ArrowRight,
  Medal
} from "lucide-react";
import { useState } from "react";
import { triggerFirework } from "@/components/firework";

const tasks = [
  {
    title: "选择方向",
    description: "确定项目类型和目标用户",
    subtasks: [
      "浏览项目灵感库,选择感兴趣的方向",
      "分析目标用户的痛点和需求",
      "评估技术和时间可行性"
    ],
    timeEstimate: "4小时"
  },
  {
    title: "验证想法",
    description: "快速测试市场反应",
    subtasks: [
      "创建项目简介和功能列表",
      "设计产品落地页",
      "收集潜在用户反馈"
    ],
    timeEstimate: "8小时"
  },
  {
    title: "构建MVP",
    description: "开发最小可用产品",
    subtasks: [
      "搭建基础开发环境",
      "实现核心功能",
      "部署测试版本"
    ],
    timeEstimate: "24小时"
  },
  {
    title: "发布产品",
    description: "推广并获取首批用户",
    subtasks: [
      "准备Product Hunt发布材料",
      "设置收款和订阅系统",
      "编写产品文档"
    ],
    timeEstimate: "12小时"
  }
];

const achievements = [
  {
    title: "起步者",
    description: "完成项目方向选择",
    icon: Medal,
    color: "bg-blue-500"
  },
  {
    title: "创造者",
    description: "完成MVP开发",
    icon: Trophy,
    color: "bg-yellow-500"
  },
  {
    title: "发布者",
    description: "成功发布产品",
    icon: Trophy,
    color: "bg-green-500"
  }
];

export default function ProgressPage() {
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [completedSubtasks, setCompletedSubtasks] = useState(new Set());

  const handleTaskToggle = (taskTitle) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskTitle)) {
      newCompleted.delete(taskTitle);
    } else {
      newCompleted.add(taskTitle);
      // 检查是否获得成就
      if (taskTitle === "选择方向") {
        triggerFirework();
      } else if (taskTitle === "构建MVP") {
        triggerFirework();
      } else if (taskTitle === "发布产品") {
        triggerFirework();
      }
    }
    setCompletedTasks(newCompleted);
  };

  const handleSubtaskToggle = (subtask) => {
    const newCompleted = new Set(completedSubtasks);
    if (newCompleted.has(subtask)) {
      newCompleted.delete(subtask);
    } else {
      newCompleted.add(subtask);
    }
    setCompletedSubtasks(newCompleted);
  };

  const calculateProgress = () => {
    const totalSubtasks = tasks.reduce((acc, task) => acc + task.subtasks.length, 0);
    const completed = completedSubtasks.size;
    return Math.round((completed / totalSubtasks) * 100);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">进度追踪</h1>
        <p className="text-muted-foreground">
          48小时行动清单
        </p>
      </motion.div>

      {/* 进度概览 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">总体进度</h2>
              <p className="text-sm text-muted-foreground">
                已完成 {calculateProgress()}%
              </p>
            </div>
            <Timer className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </Card>
      </motion.div>

      {/* 任务列表 */}
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={completedTasks.has(task.title)}
                  onCheckedChange={() => handleTaskToggle(task.title)}
                />
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {task.timeEstimate}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {task.subtasks.map((subtask) => (
                      <div key={subtask} className="flex items-center gap-2">
                        <Checkbox
                          checked={completedSubtasks.has(subtask)}
                          onCheckedChange={() => handleSubtaskToggle(subtask)}
                        />
                        <span className="text-sm">{subtask}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 成就系统 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">成就</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="bg-muted p-4 rounded-lg space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-2 ${achievement.color} bg-opacity-10`}>
                    <achievement.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">{achievement.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 