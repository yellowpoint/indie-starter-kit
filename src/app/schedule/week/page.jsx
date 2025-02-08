"use client"
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Timer,
  Brain,
  Heart,
  Dumbbell,
  Users,
  Target,
  Zap,
  MessageSquare,
  Sparkles
} from "lucide-react";

const weeklyCategories = [
  {
    id: "flow",
    name: "心流活动",
    icon: Zap,
    description: "每周1-2次，每次2-6小时的高强度心流活动",
    defaultDuration: "240",
  },
  {
    id: "exercise",
    name: "户外运动",
    icon: Dumbbell,
    description: "每周3次，每次60分钟的户外认知运动",
    defaultDuration: "60",
  },
  {
    id: "recovery",
    name: "积极恢复",
    icon: Brain,
    description: "每周3次，每次20-40分钟的恢复活动",
    defaultDuration: "30",
  },
  {
    id: "challenge",
    name: "挑战训练",
    icon: Target,
    description: "每周1次，30-60分钟的弱点/冒险训练",
    defaultDuration: "45",
  },
  {
    id: "feedback",
    name: "成果反馈",
    icon: MessageSquare,
    description: "每周1次，30-60分钟获取工作成果反馈",
    defaultDuration: "45",
  },
  {
    id: "social",
    name: "社交支持",
    icon: Users,
    description: "每周120分钟的社交互动与支持",
    defaultDuration: "120",
  }
];

const integrationTips = [
  "将运动作为坚毅力的训练场",
  "在恢复期练习正念冥想",
  "进入放松前使用麦吉弗法",
  "探索好奇心交集以激活模式识别",
  "在各项活动中叠加心流触发器",
  "利用社交活动训练情商",
  "在所有活动中追求创造力和精通"
];

export default function WeeklySchedulePage() {
  const [selectedCategory, setSelectedCategory] = useState(weeklyCategories[0]);
  const [inputValue, setInputValue] = useState("");
  const [duration, setDuration] = useState(selectedCategory.defaultDuration);
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!inputValue.trim()) return;

    setTodos([
      ...todos,
      {
        text: inputValue,
        duration: Number(duration) || Number(selectedCategory.defaultDuration),
        category: selectedCategory.id,
        completed: false
      }
    ]);

    setInputValue("");
    setDuration(selectedCategory.defaultDuration);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">周计划</h1>

      {/* 类别选择 */}
      <Card className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {weeklyCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory.id === category.id ? "default" : "outline"}
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => {
                setSelectedCategory(category);
                setDuration(category.defaultDuration);
              }}
            >
              <category.icon className="h-5 w-5" />
              <span className="text-sm text-center">{category.name}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* 添加待办表单 */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`添加 ${selectedCategory.name} 事项...`}
            className="flex-1"
          />
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-32"
            placeholder="时长(分钟)"
          />
          <Button onClick={addTodo} className="whitespace-nowrap">
            添加事项
          </Button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {selectedCategory.description}
        </p>
      </Card>

      {/* 待办列表 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {weeklyCategories.map((category) => {
            const categoryTodos = todos.filter(todo => todo.category === category.id);
            if (categoryTodos.length === 0) return null;

            return (
              <Card key={category.id} className="p-4">
                <h2 className="font-semibold mb-3 flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  {category.name}
                </h2>
                <div className="space-y-2">
                  {categoryTodos.map((todo, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(index)}
                      />
                      <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {todo.text}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {todo.duration}分钟
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* 融合练习提示 */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            融合练习提示
          </h2>
          <div className="space-y-2">
            {integrationTips.map((tip, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                  {index + 1}
                </div>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 