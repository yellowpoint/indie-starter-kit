import { PrismaClient } from "@prisma/client";
import { embed } from 'ai';
import { google } from "@ai-sdk/google";
import { cosineSimilarity } from "./utils";

const prisma = new PrismaClient();
const embeddingModel = google.textEmbeddingModel("text-embedding-004");

export async function searchRelevantChunks(query, documentIds, limit = 5) {
  // 为查询创建嵌入
  const { embedding: queryEmbedding } = await embed({
    model: embeddingModel,
    value: query,
    task_type: "RETRIEVAL_QUERY"
  });

  // 获取所有相关文档的chunks
  const chunks = await prisma.chunk.findMany({
    where: {
      documentId: {
        in: documentIds
      }
    }
  });

  // 计算相似度并排序
  const chunksWithScore = chunks.map(chunk => ({
    ...chunk,
    similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
  }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return chunksWithScore;
} 