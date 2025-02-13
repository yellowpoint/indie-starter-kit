"use client";

import { useState, useEffect, Suspense, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Trash2,
  ChevronRight,
  MoreVertical,
  Pencil,
  Users,
  Target,
  Workflow
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { featureStorage, taskStorage, projectStorage } from "@/lib/storage";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import debounce from "lodash/debounce";

// 添加自定义防抖 hook
function useDebounce(callback, delay = 500) {
  return useCallback(
    debounce((...args) => callback(...args), delay),
    [callback]
  );
}

// 提取 PlanContent 组件
function PlanContent({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [project, setProject] = useState(null);
  const [features, setFeatures] = useState([]);
  const [userFlow, setUserFlow] = useState({
    targetUsers: "",
    userScenarios: "",
    keyFeatures: ""
  });
  const [newFeature, setNewFeature] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [newSubTask, setNewSubTask] = useState("");
  const [subTasks, setSubTasks] = useState({});
  const [editingFeatureId, setEditingFeatureId] = useState(null);
  const [deleteFeaturePopoverOpen, setDeleteFeaturePopoverOpen] = useState({});

  // 创建防抖版本的数据库保存函数
  const debouncedSaveToDb = useDebounce(async (type, data) => {
    try {
      switch (type) {
        case 'project':
          const projects = await projectStorage.getAll();
          const newProjects = projects.map(p =>
            p.id === data.id ? data : p
          );
          await projectStorage.save(newProjects);
          break;

        case 'userFlow':
          await projectStorage.saveUserFlow(id, data);
          break;

        case 'features':
          await featureStorage.save(project.id, data);
          break;

        case 'tasks':
          await taskStorage.save(data.featureId, data.tasks);
          break;
      }
    } catch (error) {
      console.error(`保存${type}失败:`, error);
      toast.error(`保存失败`);
    }
  });

  // 修改更新函数，分离本地状态更新和数据库保存
  const updateProject = (updates) => {
    const updatedProject = { ...project, ...updates };
    setProject(updatedProject);
    debouncedSaveToDb('project', updatedProject);
  };

  const updateUserFlow = (updates) => {
    const newUserFlow = { ...userFlow, ...updates };
    setUserFlow(newUserFlow);
    debouncedSaveToDb('userFlow', newUserFlow);
  };

  const updateFeatureDescription = (feature, description) => {
    const updatedFeatures = features.map(f =>
      f.id === feature.id ? { ...f, description } : f
    );
    setFeatures(updatedFeatures);
    setSelectedFeature(prev => ({ ...prev, description }));
    debouncedSaveToDb('features', updatedFeatures);
  };

  const updateTaskTitle = (featureId, taskId, title) => {
    const updatedTasks = subTasks[featureId].map(task =>
      task.id === taskId ? { ...task, title } : task
    );
    setSubTasks(prev => ({
      ...prev,
      [featureId]: updatedTasks
    }));
    debouncedSaveToDb('tasks', { featureId, tasks: updatedTasks });
  };

  // 加载项目数据
  useEffect(() => {
    const loadProject = async () => {
      try {
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

        // 加载用户流程数据
        const savedUserFlow = await projectStorage.getUserFlow(id) || {
          targetUsers: "",
          userScenarios: "",
          keyFeatures: ""
        };
        setUserFlow(savedUserFlow);

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

  const addFeature = async () => {
    if (!newFeature.trim()) return;
    const feature = {
      id: Date.now() + Math.random(),
      title: newFeature,
      completed: false,
      description: ""
    };
    const newFeatures = [...features, feature];
    setFeatures(newFeatures);
    setNewFeature("");
    toast.success("功能添加成功");
    debouncedSaveToDb('features', newFeatures);
  };

  const addSubTask = async (featureId) => {
    if (!newSubTask.trim()) return;
    const task = {
      title: newSubTask,
      completed: false,
      level: 0
    };
    const newTasks = [...(subTasks[featureId] || []), task];
    setSubTasks(prev => ({
      ...prev,
      [featureId]: newTasks
    }));
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
    setSubTasks(prev => ({
      ...prev,
      [featureId]: newTasks
    }));
    toast.success("子任务添加成功");
  };

  const toggleTaskComplete = async (featureId, taskId) => {
    const updatedTasks = subTasks[featureId].map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setSubTasks(prev => ({
      ...prev,
      [featureId]: updatedTasks
    }));
  };

  const deleteTask = async (featureId, taskId) => {
    try {
      const updatedTasks = subTasks[featureId].filter(task =>
        task.id !== taskId && task.parentId !== taskId
      );
      setSubTasks(prev => ({
        ...prev,
        [featureId]: updatedTasks
      }));
      toast.success("任务删除成功");
    } catch (error) {
      console.error("删除任务失败:", error);
      toast.error("删除任务失败");
    }
  };

  const updateFeatureTitle = async (featureId, newTitle) => {
    try {
      if (!newTitle.trim()) return;

      const updatedFeatures = features.map(f =>
        f.id === featureId ? { ...f, title: newTitle } : f
      );
      setFeatures(updatedFeatures);

      if (selectedFeature?.id === featureId) {
        setSelectedFeature(prev => ({ ...prev, title: newTitle }));
      }
    } catch (error) {
      console.error("更新功能标题失败:", error);
      toast.error("更新功能标题失败");
    }
  };

  const deleteFeature = async (featureId) => {
    const updatedFeatures = features.filter(f => f.id !== featureId);
    setFeatures(updatedFeatures);
    if (selectedFeature?.id === featureId) {
      setSelectedFeature(null);
    }
    const newSubTasks = { ...subTasks };
    delete newSubTasks[featureId];
    setSubTasks(newSubTasks);
    toast.success("功能删除成功");
  };

  const generateFeatures = () => {
    try {
      if (!userFlow.keyFeatures.trim()) {
        toast.error("请先填写核心特性");
        return;
      }

      const newFeatures = userFlow.keyFeatures
        .split('\n')
        .filter(f => f.trim())
        .map(feature => ({
          id: Date.now() + Math.random(),
          title: feature.trim(),
          completed: false,
          description: ""
        }))
        .filter(newFeature =>
          !features.some(existingFeature =>
            existingFeature.title === newFeature.title
          )
        );

      if (newFeatures.length === 0) {
        toast.info("没有新的功能点需要添加");
        return;
      }

      const updatedFeatures = [...features, ...newFeatures];
      setFeatures(updatedFeatures);
      debouncedSaveToDb('features', updatedFeatures);
      toast.success(`成功生成 ${newFeatures.length} 个功能点`);
    } catch (error) {
      console.error("生成功能点失败:", error);
      toast.error("生成功能点失败");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">项目规划</h1>
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

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList>
          <TabsTrigger value="info">基本信息</TabsTrigger>
          <TabsTrigger value="flow">使用流程</TabsTrigger>
          <TabsTrigger value="features">功能规划</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">项目名称</label>
                <Input
                  value={project?.name || ""}
                  onChange={(e) => updateProject({ name: e.target.value })}
                  placeholder="输入项目名称..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">项目描述</label>
                <Textarea
                  value={project?.description || ""}
                  onChange={(e) => updateProject({ description: e.target.value })}
                  placeholder="描述项目的主要目标和范围..."
                  className="min-h-[100px]"
                />
              </div>
              {/* 其他项目基本信息字段... */}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="flow" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5" />
                  <label className="text-sm font-medium">目标用户</label>
                </div>
                <Textarea
                  value={userFlow.targetUsers}
                  onChange={(e) => updateUserFlow({ targetUsers: e.target.value })}
                  placeholder="描述你的目标用户群体..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Workflow className="h-5 w-5" />
                  <label className="text-sm font-medium">使用场景</label>
                </div>
                <Textarea
                  value={userFlow.userScenarios}
                  onChange={(e) => updateUserFlow({ userScenarios: e.target.value })}
                  placeholder="描述用户使用产品的具体场景..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    <label className="text-sm font-medium">核心特性</label>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateFeatures}
                  >
                    生成功能点
                  </Button>
                </div>
                <Textarea
                  value={userFlow.keyFeatures}
                  onChange={(e) => updateUserFlow({ keyFeatures: e.target.value })}
                  placeholder="列出产品的核心特性，每行一个..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="features">
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
                      <div className="flex items-center gap-2 flex-1">
                        <Checkbox
                          checked={feature.completed}
                          onCheckedChange={async (checked) => {
                            const updatedFeatures = features.map(f =>
                              f.id === feature.id ? { ...f, completed: checked } : f
                            );
                            setFeatures(updatedFeatures);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {editingFeatureId === feature.id ? (
                          <Input
                            value={feature.title}
                            onChange={(e) => updateFeatureTitle(feature.id, e.target.value)}
                            className={`border-none ${feature.completed ? "line-through text-muted-foreground" : ""}`}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                            onBlur={() => setEditingFeatureId(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setEditingFeatureId(null);
                              }
                            }}
                          />
                        ) : (
                          <span className={feature.completed ? "line-through text-muted-foreground" : ""}>
                            {feature.title}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <span className="text-xs text-muted-foreground">
                          {subTasks[feature.id]?.filter(t => t.completed).length || 0}/
                          {subTasks[feature.id]?.length || 0}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingFeatureId(feature.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Popover
                          open={deleteFeaturePopoverOpen[feature.id]}
                          onOpenChange={(open) => setDeleteFeaturePopoverOpen(prev => ({
                            ...prev,
                            [feature.id]: open
                          }))}
                        >
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-60">
                            <div className="space-y-4">
                              <div className="font-medium">确认删除功能？</div>
                              <div className="text-sm text-muted-foreground">
                                此操作将删除该功能及其所有子任务，且不可恢复。
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setDeleteFeaturePopoverOpen(prev => ({
                                    ...prev,
                                    [feature.id]: false
                                  }))}
                                >
                                  取消
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    deleteFeature(feature.id);
                                    setDeleteFeaturePopoverOpen(prev => ({
                                      ...prev,
                                      [feature.id]: false
                                    }));
                                  }}
                                >
                                  确认删除
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
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
                    onChange={(e) => {
                      setSelectedFeature(prev => ({ ...prev, description: e.target.value }));
                      updateFeatureDescription(selectedFeature, e.target.value);
                    }}
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
                            onChange={(e) => {
                              const newTasks = subTasks[selectedFeature.id].map(t =>
                                t.id === task.id ? { ...t, title: e.target.value } : t
                              );
                              setSubTasks(prev => ({
                                ...prev,
                                [selectedFeature.id]: newTasks
                              }));
                              updateTaskTitle(selectedFeature.id, task.id, e.target.value);
                            }}
                            onBlur={(e) => {
                              updateTaskTitle(selectedFeature.id, task.id, e.target.value);
                            }}
                            className={`${task.completed ? "line-through text-muted-foreground" : ""}`}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addSubSubTask(selectedFeature.id, task.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTask(selectedFeature.id, task.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
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