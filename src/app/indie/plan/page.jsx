"use client";

import { useState } from "react";
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

export default function PlanPage() {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [newSubTask, setNewSubTask] = useState("");
  const [subTasks, setSubTasks] = useState({});

  const addFeature = () => {
    if (!newFeature.trim()) return;
    const feature = {
      id: Date.now(),
      title: newFeature,
      completed: false,
      description: ""
    };
    setFeatures([...features, feature]);
    setNewFeature("");
  };

  const addSubTask = (featureId) => {
    if (!newSubTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newSubTask,
      completed: false,
      level: 0
    };
    setSubTasks({
      ...subTasks,
      [featureId]: [...(subTasks[featureId] || []), task]
    });
    setNewSubTask("");
  };

  const addSubSubTask = (featureId, parentTaskId) => {
    const currentTasks = subTasks[featureId] || [];
    const parentIndex = currentTasks.findIndex(t => t.id === parentTaskId);
    if (parentIndex === -1) return;

    const newTask = {
      id: Date.now(),
      title: "新子任务",
      completed: false,
      level: currentTasks[parentIndex].level + 1,
      parentId: parentTaskId
    };

    const newTasks = [...currentTasks];
    newTasks.splice(parentIndex + 1, 0, newTask);
    setSubTasks({
      ...subTasks,
      [featureId]: newTasks
    });
  };

  const toggleTaskComplete = (featureId, taskId) => {
    const updatedTasks = subTasks[featureId].map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setSubTasks({
      ...subTasks,
      [featureId]: updatedTasks
    });
  };

  const deleteTask = (featureId, taskId) => {
    const updatedTasks = subTasks[featureId].filter(task =>
      task.id !== taskId && task.parentId !== taskId
    );
    setSubTasks({
      ...subTasks,
      [featureId]: updatedTasks
    });
  };

  const updateTaskTitle = (featureId, taskId, newTitle) => {
    const updatedTasks = subTasks[featureId].map(task => {
      if (task.id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setSubTasks({
      ...subTasks,
      [featureId]: updatedTasks
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">功能规划</h1>

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
                className={`p-4 cursor-pointer ${selectedFeature?.id === feature.id ? "border-primary" : ""
                  }`}
                onClick={() => setSelectedFeature(feature)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={feature.completed}
                      onCheckedChange={(checked) => {
                        const updatedFeatures = features.map(f =>
                          f.id === feature.id ? { ...f, completed: checked } : f
                        );
                        setFeatures(updatedFeatures);
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
                onChange={(e) => {
                  const updatedFeatures = features.map(f =>
                    f.id === selectedFeature.id ? { ...f, description: e.target.value } : f
                  );
                  setFeatures(updatedFeatures);
                  setSelectedFeature({ ...selectedFeature, description: e.target.value });
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