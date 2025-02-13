import localFont from "next/font/local";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { CozeScript } from "@/components/coze-script"
import { ThemeProvider } from "@/components/theme-provider";
import { Firework } from "@/components/firework"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "独立开发启动器 | 48小时从0到1",
  description: "帮助独立开发者快速启动项目的工具集,包含心态指南、策略库、项目灵感、工具包和进度追踪",
  icons: [
    {
      rel: "icon",
      url: "/favicon.svg",
      type: "image/svg+xml"
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png"
    }
  ],
  openGraph: {
    title: "独立开发启动器",
    description: "48小时从0到1启动你的独立开发之旅",
    url: "https://indie-starter.vercel.app",
    siteName: "独立开发启动器",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "独立开发启动器",
    description: "48小时从0到1启动你的独立开发之旅",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              {/* <Header className="h-16" /> */}
              <main className="h-[calc(100vh)] overflow-auto">
                {children}
              </main>
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
          {/* <CozeScript /> */}
          <Firework />
        </ThemeProvider>
      </body>
    </html>
  );
}
