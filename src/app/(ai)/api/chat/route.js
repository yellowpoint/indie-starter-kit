import { getParams } from "@/lib/utils";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { DEFAULT_MODEL, registry } from "../../providers";
import { PrismaClient } from "@prisma/client";
import { searchRelevantChunks } from "@/lib/vector-search";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { messages, model = DEFAULT_MODEL, documentIds = [] } = await getParams(request);

    if (!messages?.length) {
      return NextResponse.json(
        { error: "缺少必要参数" },
        { status: 400 },
      );
    }

    // 如果有文档ID,检索相关内容
    let context = "";
    if (documentIds.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const relevantChunks = await searchRelevantChunks(lastMessage.content, documentIds);
      context = relevantChunks.map(chunk => chunk.content).join("\n\n");
    }

    // 将上下文添加到系统消息
    const systemMessage = {
      role: "system",
      content: context ?
        `以下是相关文档内容,请基于这些内容回答用户问题:\n\n${context}` :
        "你是一个智能助手,请帮助回答用户问题。"
    };

    const llmModel = registry.languageModel(model);
    const response = streamText({
      model: llmModel,
      messages: [systemMessage, ...messages],
    });

    return response.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API 错误:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }
} 