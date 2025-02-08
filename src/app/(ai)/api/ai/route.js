import { getParams } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { generateObject, generateText } from "ai";
import { NextResponse } from "next/server";
import { mockLLMResponses } from "./mock";
import { DEFAULT_MODEL, registry } from "../../providers";

const prisma = new PrismaClient();

async function getPromptContent(promptKey, prompt) {
  if (prompt) return prompt;

  if (promptKey) {
    const promptRecord = await prisma.prompt.findFirst({
      where: { name: promptKey },
    });

    if (!promptRecord) {
      throw new Error("未找到对应的prompt");
    }
    return promptRecord.promptContent;
  }

  throw new Error("promptKey 和 prompt 不能同时为空");
}

async function handler(request) {
  try {
    const params = await getParams(request);
    const {
      promptKey,
      prompt,
      content: requestContent,
      imageUrl,
      model = DEFAULT_MODEL,
      isMock = false,
      returnObject = false,
    } = params;

    // 验证输入
    if ((!promptKey && !prompt) || (!requestContent && !imageUrl)) {
      return NextResponse.json(
        { code: 1, message: "缺少必要参数" },
        { status: 400 },
      );
    }
    // 处理模拟数据
    if (isMock) {
      const mockResponse = mockLLMResponses[promptKey];

      return NextResponse.json({
        code: 0,
        data: { text: mockResponse },
      });
    }
    const llmModel = registry.languageModel(model);
    // 获取prompt内容
    const promptContent = await getPromptContent(promptKey, prompt);

    // 组装消息内容
    const contentParts = [];

    // 添加prompt内容
    if (promptContent) {
      contentParts.push({ type: "text", text: promptContent });
    }

    // 添加请求内容
    if (requestContent) {
      contentParts.push({ type: "text", text: requestContent });
    }

    // 添加图片内容
    if (imageUrl) {
      contentParts.push({ type: "image", image: imageUrl });
    }
    const aiParams = {
      model: llmModel,
      messages: [
        {
          role: "user",
          content: contentParts,
        },
      ],
    };
    let response;
    if (returnObject) {
      response = await generateObject({ ...aiParams, output: "no-schema" });
      response.text = JSON.stringify(response.object);
    } else {
      response = await generateText(aiParams);
    }

    let historyError;
    try {
      // 在返回结果之前添加以下代码
      await prisma.aiHistory.create({
        data: {
          promptKey,
          prompt: promptContent,
          content: requestContent,
          imageUrl,
          response: response?.text,
          model,
        },
      });
    } catch (error) {
      historyError = error.message;
      console.error("保存 LLM 历史记录失败:", error);
    }
    return NextResponse.json({ code: 0, data: response, historyError });
  } catch (error) {
    console.error("LLM API 错误:", error);
    return NextResponse.json(
      {
        code: 1,
        message: "生成内容失败",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST };
