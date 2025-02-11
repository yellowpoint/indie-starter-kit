"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  Paintbrush,
  Megaphone,
  ExternalLink,
  Copy,
  Check,
  Star
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const toolkits = [
  {
    title: "开发工具",
    icon: Wrench,
    color: "bg-blue-500",
    tools: [
      {
        name: "T3 Stack",
        description: "Next.js + tRPC + Prisma + Tailwind",
        url: "https://create.t3.gg",
        command: "npm create t3-app@latest"
      },
      {
        name: "Supabase",
        description: "开源的 Firebase 替代品",
        url: "https://supabase.com",
        command: "npm install @supabase/supabase-js"
      },
      {
        name: "Vercel",
        description: "最佳 Next.js 部署平台",
        url: "https://vercel.com",
        command: "npm i -g vercel && vercel"
      }
    ]
  },
  {
    title: "设计资源",
    icon: Paintbrush,
    color: "bg-purple-500",
    tools: [
      {
        name: "Figma",
        description: "协作设计工具",
        url: "https://www.figma.com",
        featured: true
      },
      {
        name: "Tailwind UI",
        description: "高质量组件库",
        url: "https://tailwindui.com"
      },
      {
        name: "Unsplash",
        description: "免费高清图库",
        url: "https://unsplash.com"
      }
    ]
  },
  {
    title: "营销渠道",
    icon: Megaphone,
    color: "bg-green-500",
    tools: [
      {
        name: "Product Hunt",
        description: "产品发布平台",
        url: "https://www.producthunt.com",
        guide: "https://blog.producthunt.com/how-to-launch-on-product-hunt-7c1843e06399"
      },
      {
        name: "Gumroad",
        description: "数字产品售卖平台",
        url: "https://gumroad.com",
        guide: "https://help.gumroad.com/article/13-getting-started"
      },
      {
        name: "Indie Hackers",
        description: "独立开发者社区",
        url: "https://www.indiehackers.com",
        guide: "https://www.indiehackers.com/start"
      }
    ]
  }
];

export default function ToolkitPage() {
  const [copiedCommand, setCopiedCommand] = useState(null);

  const copyCommand = async (command) => {
    await navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    toast.success("命令已复制");
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">工具包</h1>
        <p className="text-muted-foreground">
          快速开发,降低启动门槛
        </p>
      </motion.div>

      <div className="space-y-8">
        {toolkits.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`rounded-full p-2 ${category.color} bg-opacity-10`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-muted p-4 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{tool.name}</h3>
                        {tool.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={tool.url} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                    {tool.command && (
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-background p-2 rounded flex-1">
                          {tool.command}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyCommand(tool.command)}
                        >
                          {copiedCommand === tool.command ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    )}
                    {tool.guide && (
                      <Button variant="link" size="sm" asChild className="p-0">
                        <Link href={tool.guide} target="_blank">
                          查看使用指南
                        </Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 