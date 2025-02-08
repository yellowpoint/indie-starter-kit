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
      title: "目标",
      icon: Target,
      items: [
        {
          title: "学习助手",
          url: "/goals/learning-assistant",
          icon: Bot,
        },
        {
          title: "心流快乐",
          url: "/goals/flow-happiness",
          icon: Heart,
        },

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
    {
      title: "心流",
      icon: Activity,
      items: [
        {
          title: "心流系统",
          url: "/flow/overview",
          icon: Target,
        },
        {
          title: "为什么不快乐",
          url: "/flow/why-not-happy",
          icon: Heart,
        },
        {
          title: "控制意识",
          url: "/flow/consciousness",
          icon: Brain,
        },
        {
          title: "心流要素",
          url: "/flow/flow-elements",
          icon: Target,
        },
        {
          title: "如何找目标",
          url: "/flow/find-target",
          icon: Compass,
        },
      ],
    },
    {
      title: "中国哲学",
      icon: BookOpen,
      items: [
        {
          title: "阳明心学",
          url: "/philosophy/yangming",
          icon: Compass,
        },
      ],
    },
    {
      title: "快乐",
      icon: Heart,
      items: [
        {
          title: "快乐系统",
          url: "/happy/happiness",
          icon: Heart,
        },
        {
          title: "好心情清单",
          url: "/happy/happy-list",
          icon: Sparkles,
        },
        {
          title: "多巴胺恢复",
          url: "/happy/dopamine",
          icon: Zap,
        }
      ]
    },
    {
      title: "其他",
      icon: MoreHorizontal,
      items: [
        {
          title: "职业倦怠",
          url: "/burnout",
          icon: Battery,
        },
        {
          title: "有意义的工作",
          url: "/meaningful-work",
          icon: Briefcase,
        },

        {
          title: "人生不必太用力",
          url: "/flow/not-too-hard",
          icon: Leaf,
        },
        {
          title: "人生设计",
          url: "/life-design",
          icon: Compass,
        },
        {
          title: "我的人生设计",
          url: "/my-life-design",
          icon: Target,
        }
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
      <SidebarHeader className="relative">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActive} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter className="relative">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
