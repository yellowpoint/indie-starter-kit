"use client"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import React from 'react';
import { data as sidebarData } from '@/components/app-sidebar';
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// 从导航数据生成面包屑映射
const generateBreadcrumbsMap = () => {
  const map = {
    "/": { label: "首页" }
  };

  sidebarData.navMain.forEach(section => {
    section.items?.forEach(item => {
      map[item.url] = {
        label: item.title,
        parent: "/",
        section: section.title
      };
    });
  });

  return map;
};

const breadcrumbsMap = generateBreadcrumbsMap();

// 获取面包屑路径
function getBreadcrumbs(path) {
  const breadcrumbs = [];
  let currentPath = path;

  while (currentPath) {
    const breadcrumb = breadcrumbsMap[currentPath];
    if (!breadcrumb) break;

    breadcrumbs.unshift({
      path: currentPath,
      label: breadcrumb.label,
      section: breadcrumb.section
    });

    currentPath = breadcrumb.parent;
  }

  return breadcrumbs;
}

export function Header({ className }) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className={cn("flex h-16 shrink-0 items-center gap-2 border-b bg-background px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12", className)}>
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.path}>
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>
                      {breadcrumb.section && (
                        <span className="text-muted-foreground mr-1">
                          {breadcrumb.section}
                        </span>
                      )}
                      {breadcrumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={breadcrumb.path}>
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* 主题切换按钮 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">切换主题</span>
      </Button>
    </header>
  );
} 