import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { bufferToVector } from "./embeddings";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getParams = async (req) => {
  if (req.method === "GET") {
    const { searchParams } = new URL(req.url);
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  if (req.method === "POST") {
    const contentType = req.headers.get("content-type") || "";

    try {
      if (contentType.includes("application/json")) {
        const body = await req.json();
        return body;
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        const formData = await req.formData();
        const params = {};
        formData.forEach((value, key) => {
          params[key] = value.toString();
        });
        return params;
      } else if (contentType.includes("text/plain")) {
        const text = await req.text();
        return { text };
      } else {
        return { error: "Unsupported Content-Type：" + contentType };
      }
    } catch (error) {
      return { error: "Failed to parse request body", details: error.message };
    }
  }

  return {};
};

/**
 * 计算两个向量的余弦相似度
 */
export function cosineSimilarity(vectorA, vectorB) {
  if (vectorA instanceof Buffer) {
    vectorA = bufferToVector(vectorA);
  }
  if (vectorB instanceof Buffer) {
    vectorB = bufferToVector(vectorB);
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i];
    normB += vectorB[i] * vectorB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  return dotProduct / (normA * normB);
}
