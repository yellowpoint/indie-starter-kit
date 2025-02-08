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
      title: "独立开发启动器",
      url: "/indie-starter",
      icon: Rocket,
      items: [
        {
          title: "心态指南",
          url: "/indie-starter/mindset",
          icon: Brain,
          description: "调整心态,建立正确的独立开发思维模式"
        },
        {
          title: "策略库",
          url: "/indie-starter/strategy",
          icon: Lightbulb,
          description: "验证想法,找到适合的切入点"
        },
        {
          title: "项目灵感库",
          url: "/indie-starter/ideas",
          icon: Sparkles,
          description: "发现机会,获取可执行的项目思路"
        },
        {
          title: "工具包",
          url: "/indie-starter/toolkit",
          icon: Wrench,
          description: "快速开发,降低启动门槛"
        },
        {
          title: "进度追踪",
          url: "/indie-starter/progress",
          icon: CheckSquare,
          description: "48小时行动清单"
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
