"use client"
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Timer, Brain, ListTodo, Heart, Dumbbell, Book, Moon } from "lucide-react";

const categories = [
  {
    id: "focus",
    name: "专注工作",
    icon: Timer,
    description: "90～120分钟不间断的注意力集中",
    defaultDuration: "90",
  },
  {
    id: "attention",
    name: "注意力管理",
    icon: Brain,
    description: "为明天的专注时段做准备",
    defaultDuration: "5",
  },
  {
    id: "goals",
    name: "目标清单",
    icon: ListTodo,
    description: "列出明确的目标清单",
    defaultDuration: "5",
  },
  {
    id: "gratitude",
    name: "感恩练习",
    icon: Heart,
    description: "每天的感恩练习",
    defaultDuration: "5",
  },
  {
    id: "meditation",
    name: "放松冥想",
    icon: Dumbbell,
    description: "放松或冥想时间",
    defaultDuration: "20",
  },
  {
    id: "reading",
    name: "阅读学习",
    icon: Book,
    description: "阅读非本专业读物",
    defaultDuration: "20",
  },
  {
    id: "sleep",
    name: "充足睡眠",
    icon: Moon,
    description: "保证7～8小时睡眠",
    defaultDuration: "480",
  },
];

const DailyTodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [duration, setDuration] = useState(categories[0].defaultDuration);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        text: inputValue,
        completed: false,
        category: selectedCategory.id,
        duration: parseInt(duration),
        createdAt: new Date().toISOString()
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const getTotalDuration = (categoryId) => {
    return todos
      .filter(todo => todo.category === categoryId)
      .reduce((acc, todo) => acc + todo.duration, 0);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">每日事项</h1>

      {/* 分类卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`p-4 cursor-pointer hover:border-primary transition-colors ${selectedCategory.id === category.id ? 'border-primary' : ''
              }`}
            onClick={() => {
              setSelectedCategory(category);
              setDuration(category.defaultDuration);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <category.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {getTotalDuration(category.id)}分钟
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 添加待办表单 */}
      <Card className="p-4 mb-6">
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
      <div className="space-y-4">
        {categories.map((category) => {
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
    </div>
  );
};

export default DailyTodoPage;

