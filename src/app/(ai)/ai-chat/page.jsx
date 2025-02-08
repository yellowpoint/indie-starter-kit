"use client";

import { useChat } from "ai/react";
import { Bot, Send, User, Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DEFAULT_MODEL } from "@/app/(ai)/providers";

export default function AIChatPage() {
  const [documents, setDocuments] = useState([]);
  const scrollAreaRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-doc", {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (data.success) {
        setDocuments(prev => [...prev, data.document]);
        toast.success("文档上传成功");
      } else {
        toast.error("文档上传失败");
      }
    } catch (err) {
      console.error(err);
      toast.error("文档上传失败");
    }
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    error,
    reload,
    stop
  } = useChat({
    api: "/api/chat",
    initialMessages: [],
    body: {
      model: DEFAULT_MODEL,
      documentIds: documents.map(d => d.id)
    },
    onResponse: (response) => {
      if (!response.ok) {
        toast.error("发送消息失败");
      }
    },
    onFinish: (message) => {
      // 滚动到底部
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    },
    onError: (error) => {
      console.error("Chat error:", error);
      toast.error(error.message || "发送消息失败");
    },
    // 节流 UI 更新以提高性能
    experimental_throttle: 50,
  });

  // 包装handleSubmit以清理input
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await originalHandleSubmit(e);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">AI 对话</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => document.getElementById("file-upload").click()}
          >
            <Upload size={16} />
            上传文档
          </Button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* 显示已上传文档 */}
      {documents.length > 0 && (
        <div className="px-4 pb-2">
          <p className="text-sm text-muted-foreground">已上传文档:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {documents.map(doc => (
              <div key={doc.id} className="text-xs bg-muted px-2 py-1 rounded">
                {doc.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <Card className="flex-1 mx-4 mb-4 flex flex-col overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="flex-1">
          <div className="flex flex-col gap-4 p-4">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                >
                  <Avatar>
                    <AvatarFallback className={isUser ? "bg-primary" : ""}>
                      {isUser ? <User size={16} className="text-primary-foreground" /> : <Bot size={16} />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg px-3 py-2 ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </p>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2">
                <span className="animate-pulse">AI正在思考...</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stop}
                >
                  停止
                </Button>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2">
                <span className="text-destructive">出错了，请重试</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reload}
                >
                  重试
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t p-4"
        >
          <Input
            placeholder="输入消息..."
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send size={16} />
          </Button>
        </form>
      </Card>
    </div>
  );
} 