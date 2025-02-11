"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "代码片段管理器",
      startDate: "2024-03-15",
      progress: 75,
      excitement: 4,
      difficulty: 3,
      status: "进行中"
    },
    // 添加更多项目...
  ]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">项目管理</h1>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>项目名称</TableHead>
              <TableHead>开始时间</TableHead>
              <TableHead>进度</TableHead>
              <TableHead>心动指数</TableHead>
              <TableHead>难度</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>
                  <Progress value={project.progress} className="w-[100px]" />
                </TableCell>
                <TableCell>{project.excitement}/5</TableCell>
                <TableCell>{project.difficulty}/5</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{/* 添加编辑按钮等 */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 