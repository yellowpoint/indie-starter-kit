import { google } from "@ai-sdk/google";
import { experimental_createProviderRegistry as createProviderRegistry } from "ai";

// 定义可用的模型列表
export const AVAILABLE_MODELS = [
  { value: "google:gemini-1.5-flash", label: "Gemini 1.5 Flash" },
  { value: "google:gemini-1.5-pro", label: "Gemini 1.5 Pro" },
  { value: "openai:gpt-4", label: "GPT-4" },
  { value: "openai:gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
];

// 创建provider注册表
export const registry = createProviderRegistry({
  google: google,
});

// 定义默认模型
export const DEFAULT_MODEL = "google:gemini-1.5-flash";
