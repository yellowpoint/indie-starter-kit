"use client";

import { useState, useEffect } from "react";
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
import { projectStorage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { featureStorage } from "@/lib/storage";
import { taskStorage } from "@/lib/storage";

const ProjectForm = ({ project, onSubmit }) => {
  const [formData, setFormData] = useState(project);

  useEffect(() => {
    setFormData(project);
  }, [project]);

  const handleChange = (updates) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    onSubmit(newData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">项目名称</label>
        <Input
          value={formData.name}
          onChange={(e) => handleChange({ name: e.target.value })}
          placeholder="输入项目名称"
        />
      </div>
      <div>
        <label className="text-sm font-medium">开始时间</label>
        <Input
          type="date"
          value={formData.startDate}
          onChange={(e) => handleChange({ startDate: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm font-medium">进度</label>
        <Input
          type="number"
          min="0"
          max="100"
          value={formData.progress}
          onChange={(e) => handleChange({ progress: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <label className="text-sm font-medium">心动指数 (1-5)</label>
        <Select
          value={formData.excitement.toString()}
          onValueChange={(value) => handleChange({ excitement: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map(n => (
              <SelectItem key={n} value={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium">难度 (1-5)</label>
        <Select
          value={formData.difficulty.toString()}
          onValueChange={(value) => handleChange({ difficulty: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map(n => (
              <SelectItem key={n} value={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium">状态</label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleChange({ status: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["未开始", "进行中", "已完成", "已暂停"].map(status => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const calculateProjectProgress = async (projectId) => {
  try {
    // 获取项目的所有功能
    const features = await featureStorage.getAll(projectId);
    if (!features || features.length === 0) return 0;

    let completedWeight = 0;
    const totalFeatures = features.length;

    // 遍历功能列表
    for (const feature of features) {
      if (feature.completed) {
        // 如果功能已标记完成,直接计入整个权重
        completedWeight += 1;
      } else {
        // 功能未完成时,才检查子任务完成情况
        const tasks = await taskStorage.getAll(feature.id);
        if (tasks && tasks.length > 0) {
          const completedTasks = tasks.filter(task => task.completed).length;
          completedWeight += (completedTasks / tasks.length);
        }
      }
    }

    // 计算总体进度百分比
    return Math.round((completedWeight / totalFeatures) * 100);
  } catch (error) {
    console.error("计算项目进度失败:", error);
    return 0;
  }
};

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: "",
    startDate: new Date().toISOString().split('T')[0],
    progress: 0,
    excitement: 3,
    difficulty: 3,
    status: "未开始"
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const savedProjects = await projectStorage.getAll();

        // 计算每个项目的实际进度
        const projectsWithProgress = await Promise.all(
          savedProjects.map(async (project) => {
            const progress = await calculateProjectProgress(project.id);
            return { ...project, progress };
          })
        );

        setProjects(projectsWithProgress);
      } catch (error) {
        console.error("加载项目失败:", error);
        toast.error("加载项目失败");
      }
    };
    loadProjects();
  }, []);

  const saveProjects = async (newProjects) => {
    await projectStorage.save(newProjects);
    setProjects(newProjects);
  };

  const handleAddProject = async () => {
    if (!newProject.name.trim()) {
      toast.error("请输入项目名称");
      return;
    }

    const project = {
      id: Date.now(),
      ...newProject
    };

    await saveProjects([...projects, project]);
    setIsAddDialogOpen(false);
    setNewProject({
      name: "",
      startDate: new Date().toISOString().split('T')[0],
      progress: 0,
      excitement: 3,
      difficulty: 3,
      status: "未开始"
    });
    toast.success("项目添加成功");
  };

  const handleDeleteProject = async (id) => {
    if (confirm("确定要删除这个项目吗？")) {
      const newProjects = projects.filter(p => p.id !== id);
      await saveProjects(newProjects);
      toast.success("项目删除成功");
    }
  };

  const handleUpdateProject = async (id, updates) => {
    try {
      // 如果更新不包含进度,则重新计算
      if (!updates.hasOwnProperty('progress')) {
        const progress = await calculateProjectProgress(id);
        updates = { ...updates, progress };
      }

      const newProjects = projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      );
      await saveProjects(newProjects);
      setEditingProject(null);
      toast.success("项目更新成功");
    } catch (error) {
      console.error("更新项目失败:", error);
      toast.error("更新项目失败");
    }
  };

  const handleProjectClick = async (project) => {
    await projectStorage.setCurrentProject(project);
    router.push(`/indie/plan/${project.id}`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">项目管理</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              添加项目
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新项目</DialogTitle>
            </DialogHeader>
            <ProjectForm
              project={newProject}
              onSubmit={setNewProject}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleAddProject}>
                确定
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                className={editingProject?.id !== project.id ? "cursor-pointer hover:bg-muted/50" : ""}
                onClick={() => {
                  if (editingProject?.id !== project.id) {
                    handleProjectClick(project);
                  }
                }}
              >
                {editingProject?.id === project.id ? (
                  // 编辑模式
                  <>
                    <TableCell colSpan={6}>
                      <ProjectForm
                        project={editingProject}
                        onSubmit={setEditingProject}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProject(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateProject(project.id, editingProject);
                          }}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  // 查看模式
                  <>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.startDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="w-[100px]" />
                        <span className="text-sm text-muted-foreground">
                          {project.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{project.excitement}/5</TableCell>
                    <TableCell>{project.difficulty}/5</TableCell>
                    <TableCell>{project.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProject(project);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 