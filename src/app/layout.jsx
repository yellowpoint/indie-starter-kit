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
  title: "跨越不可能",
  description: "跨越不可能",
  icons: [
    {
      rel: "icon",
      url: "/favicon.svg",  // 改用 SVG 格式
      type: "image/svg+xml"
    },
    {
      rel: "apple-touch-icon", // 用于 iOS 设备的图标
      url: "/apple-touch-icon.png"
    }
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header className="h-16" />
              <main className="h-[calc(100vh-4rem)]">
                {children}
              </main>
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
          <CozeScript />
          <Firework />
        </ThemeProvider>
      </body>
    </html>
  );
}
