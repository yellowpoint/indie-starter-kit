"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

export default function PlanPage() {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [subTasks, setSubTasks] = useState({});

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures([...features, newFeature]);
    setNewFeature("");
  };

  const addSubTask = (featureId, task) => {
    setSubTasks({
      ...subTasks,
      [featureId]: [...(subTasks[featureId] || []), task]
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
            />
            <Button onClick={addFeature}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-4 cursor-pointer ${selectedFeature === index ? "border-primary" : ""
                  }`}
                onClick={() => setSelectedFeature(index)}
              >
                {feature}
              </Card>
            ))}
          </div>
        </div>

        {/* 右侧子任务详情 */}
        {selectedFeature !== null && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {features[selectedFeature]}
            </h2>
            {/* 子任务列表和添加表单 */}
          </Card>
        )}
      </div>
    </div>
  );
} 