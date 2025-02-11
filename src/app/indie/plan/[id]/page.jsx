"use client";

import { useState, useEffect, Suspense, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, ChevronRight, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { featureStorage, taskStorage, projectStorage } from "@/lib/storage";
import { toast } from "sonner";

// 提取 PlanContent 组件
function PlanContent({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [project, setProject] = useState(null);
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [newSubTask, setNewSubTask] = useState("");
  const [subTasks, setSubTasks] = useState({});

  // 加载项目数据
  useEffect(() => {
    const loadProject = async () => {
      try {
        // 根据 ID 获取项目
        const projectData = await projectStorage.getProject(Number(id));
        if (!projectData) {
          toast.error("项目不存在");
          router.push("/indie/projects");
          return;
        }
        setProject(projectData);

        // 加载项目的功能特性
        const savedFeatures = await featureStorage.getAll(id);
        setFeatures(savedFeatures);

        // 加载所有特性的任务
        const tasksPromises = savedFeatures.map(async feature => {
          const tasks = await taskStorage.getAll(feature.id);
          return [feature.id, tasks];
        });

        const tasksResults = await Promise.all(tasksPromises);
        const tasksMap = Object.fromEntries(tasksResults);
        setSubTasks(tasksMap);
      } catch (error) {
        console.error("加载项目数据失败:", error);
        toast.error("加载项目数据失败");
      }
    };

    loadProject();
  }, [id, router]);

  // 保存特性
  const saveFeatures = async (newFeatures) => {
    if (!project?.id) return;
    const updatedFeatures = await featureStorage.save(project.id, newFeatures);
    setFeatures(updatedFeatures);
  };

  // 保存任务
  const saveTasks = async (featureId, newTasks) => {
    const updatedTasks = await taskStorage.save(featureId, newTasks);
    setSubTasks(prev => ({
      ...prev,
      [featureId]: updatedTasks
    }));
  };

  const addFeature = async () => {
    if (!newFeature.trim()) return;
    const feature = {
      title: newFeature,
      completed: false,
      description: ""
    };
    const newFeatures = [...features, feature];
    await saveFeatures(newFeatures);
    setNewFeature("");
    toast.success("功能添加成功");
  };

  const addSubTask = async (featureId) => {
    if (!newSubTask.trim()) return;
    const task = {
      title: newSubTask,
      completed: false,
      level: 0
    };
    const newTasks = [...(subTasks[featureId] || []), task];
    await saveTasks(featureId, newTasks);
    setNewSubTask("");
    toast.success("任务添加成功");
  };

  const addSubSubTask = async (featureId, parentTaskId) => {
    const currentTasks = subTasks[featureId] || [];
    const parentIndex = currentTasks.findIndex(t => t.id === parentTaskId);
    if (parentIndex === -1) return;

    const newTask = {
      title: "新子任务",
      completed: false,
      level: currentTasks[parentIndex].level + 1,
      parentId: parentTaskId
    };

    const newTasks = [...currentTasks];
    newTasks.splice(parentIndex + 1, 0, newTask);
    await saveTasks(featureId, newTasks);
    toast.success("子任务添加成功");
  };

  const toggleTaskComplete = async (featureId, taskId) => {
    const updatedTasks = subTasks[featureId].map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    await saveTasks(featureId, updatedTasks);
  };

  const deleteTask = async (featureId, taskId) => {
    const updatedTasks = subTasks[featureId].filter(task =>
      task.id !== taskId && task.parentId !== taskId
    );
    await saveTasks(featureId, updatedTasks);
    toast.success("任务删除成功");
  };

  const updateTaskTitle = async (featureId, taskId, newTitle) => {
    const updatedTasks = subTasks[featureId].map(task => {
      if (task.id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    await saveTasks(featureId, updatedTasks);
  };

  const updateFeatureDescription = async (feature, description) => {
    const updatedFeatures = features.map(f =>
      f.id === feature.id ? { ...f, description } : f
    );
    await saveFeatures(updatedFeatures);
    setSelectedFeature({ ...feature, description });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">功能规划</h1>
          {project && (
            <p className="text-muted-foreground">
              项目：{project.name}
            </p>
          )}
        </div>
        <Button variant="outline" onClick={() => router.push("/indie/projects")}>
          返回项目列表
        </Button>
      </div>

      <div className="grid grid-cols-[300px_1fr] gap-6">
        {/* 左侧功能列表 */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="添加新功能..."
              onKeyPress={(e) => e.key === 'Enter' && addFeature()}
            />
            <Button onClick={addFeature}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={`p-4 cursor-pointer ${selectedFeature?.id === feature.id ? "border-primary" : ""}`}
                onClick={() => setSelectedFeature(feature)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={feature.completed}
                      onCheckedChange={async (checked) => {
                        const updatedFeatures = features.map(f =>
                          f.id === feature.id ? { ...f, completed: checked } : f
                        );
                        await saveFeatures(updatedFeatures);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className={feature.completed ? "line-through text-muted-foreground" : ""}>
                      {feature.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {subTasks[feature.id]?.filter(t => t.completed).length || 0}/
                    {subTasks[feature.id]?.length || 0}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 右侧子任务详情 */}
        {selectedFeature && (
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{selectedFeature.title}</h2>
                <Button variant="outline" size="sm" onClick={() => setSelectedFeature(null)}>
                  关闭
                </Button>
              </div>

              <Textarea
                placeholder="添加功能描述..."
                value={selectedFeature.description}
                onChange={(e) => updateFeatureDescription(selectedFeature, e.target.value)}
                className="min-h-[100px]"
              />

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSubTask}
                    onChange={(e) => setNewSubTask(e.target.value)}
                    placeholder="添加新任务..."
                    onKeyPress={(e) => e.key === 'Enter' && addSubTask(selectedFeature.id)}
                  />
                  <Button onClick={() => addSubTask(selectedFeature.id)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {(subTasks[selectedFeature.id] || []).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-2"
                      style={{ marginLeft: `${task.level * 24}px` }}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskComplete(selectedFeature.id, task.id)}
                      />
                      <Input
                        value={task.title}
                        onChange={(e) => updateTaskTitle(selectedFeature.id, task.id, e.target.value)}
                        className={task.completed ? "line-through text-muted-foreground" : ""}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => addSubSubTask(selectedFeature.id, task.id)}>
                            添加子任务
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteTask(selectedFeature.id, task.id)}>
                            删除任务
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// 加载状态组件
function LoadingState() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="animate-pulse">
        <div className="h-8 w-32 bg-muted rounded mb-2"></div>
        <div className="h-4 w-48 bg-muted rounded"></div>
      </div>
      <div className="grid grid-cols-[300px_1fr] gap-6">
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded"></div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </div>
        <div className="h-[400px] bg-muted rounded"></div>
      </div>
    </div>
  );
}

// 主页面组件
export default function PlanPage({ params }) {
  return (
    <Suspense fallback={<LoadingState />}>
      <PlanContent params={params} />
    </Suspense>
  );
} 