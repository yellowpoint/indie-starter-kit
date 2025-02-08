import { google } from "@ai-sdk/google";
import { embed } from 'ai';

// 初始化Google AI模型用于生成embeddings
const embeddingModel = google.textEmbeddingModel("text-embedding-004");

export async function createEmbedding(text) {
  try {
    const input = text.replaceAll('\\n', ' ');
    const { embedding } = await embed({
      model: embeddingModel,
      value: input,
      task_type: "RETRIEVAL_DOCUMENT"
    });

    // 将嵌入向量转换为Buffer以存储在数据库中
    return Buffer.from(new Float32Array(embedding).buffer);
  } catch (error) {
    console.error("创建嵌入向量失败:", error);
    throw error;
  }
}

// 将Buffer转回Float32Array
export function bufferToVector(buffer) {
  return new Float32Array(buffer.buffer);
} 