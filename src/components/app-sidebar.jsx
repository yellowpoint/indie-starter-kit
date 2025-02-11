"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Calendar,
  Settings2,
  SquareTerminal,
  Home,
  Zap,
  Brain,
  Sparkles,
  Activity,
  MessageSquare,
  Wand2,
  History,
  Gamepad2,
  MoreHorizontal,
  Briefcase,
  Target,
  Heart,
  Leaf,
  Compass,
  Battery,
  Rocket,
  Lightbulb,
  Wrench,
  CheckSquare,
  Play,
  ListTodo,
  FileText,
  FolderKanban,
} from "lucide-react";
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { triggerFirework } from "@/components/firework"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
export const data = {
  user: {
    name: "大典",
    email: "870003719@qq.com",
    // avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "独立开发",
      icon: Rocket,
      items: [
        {
          title: "项目启动",
          url: "/indie/start",
          icon: Play,
          description: "开始你的独立开发之旅"
        },
        {
          title: "项目执行",
          url: "/indie/execute",
          icon: ListTodo,
          description: "按步骤执行项目开发"
        },
        {
          title: "功能规划",
          url: "/indie/plan",
          icon: FileText,
          description: "详细的功能分解与规划"
        },
        {
          title: "项目管理",
          url: "/indie/projects",
          icon: FolderKanban,
          description: "管理所有独立开发项目"
        },
        {
          title: "心态指导",
          url: "/indie/mindset",
          icon: Brain,
          description: "独立开发者心态建设"
        },
        {
          title: "灵感库",
          url: "/indie/ideas",
          icon: Sparkles,
          description: "收集灵感与创意"
        },
        {
          title: "工具箱",
          url: "/indie/toolkit",
          icon: Wrench,
          description: "常用工具与资源"
        }
      ]
    },
    {
      title: "AI",
      icon: Bot,
      items: [
        {
          title: "AI 对话",
          url: "/ai-chat",
          icon: MessageSquare,
        },
        {
          title: "AI Prompt",
          url: "/ai-prompt",
          icon: Wand2,
        },
        {
          title: "AI History",
          url: "/ai-history",
          icon: History,
        },
        {
          title: "AI Playground",
          url: "/ai-playground",
          icon: Gamepad2,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({
  ...props
}) {
  const pathname = usePathname()

  // 根据当前路径更新导航数据
  const navMainWithActive = React.useMemo(() => {
    return data.navMain.map(section => ({
      ...section,
      // 检查当前路径是否匹配该部分的任何子项
      isActive: section.items?.some(item => pathname === item.url),
      items: section.items?.map(item => ({
        ...item,
        // 检查当前路径是否匹配该项
        isActive: pathname === item.url
      }))
    }))
  }, [pathname])

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader className="relative">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={navMainWithActive} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      {/* <SidebarFooter className="relative">
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
