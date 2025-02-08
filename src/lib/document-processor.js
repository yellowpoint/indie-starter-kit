import { createEmbedding } from "./embeddings";

export async function processDocument(file) {
  // 从文件中提取文本
  const text = await extractText(file);

  // 将文档分成chunks
  const chunks = splitIntoChunks(text);

  // 为每个chunk创建嵌入
  const chunksWithEmbeddings = await Promise.all(
    chunks.map(async (chunk) => ({
      content: chunk,
      embedding: await createEmbedding(chunk)
    }))
  );

  return {
    chunks: chunksWithEmbeddings,
    metadata: {
      type: file.type,
    }
  };
}

// 将文本分割成较小的chunks
function splitIntoChunks(text, maxChunkSize = 1000) {
  // 使用正则表达式匹配中文句号、英文句号、问号和感叹号作为分隔符
  const sentences = text
    .trim()
    .split(/[。.！!？?]/g)
    .filter(i => i !== '')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const chunks = sentences;
  let currentChunk = '';
  console.log(sentences);
  // for (const sentence of sentences) {
  //   // 如果当前chunk加上新句子的长度超过maxChunkSize
  //   // 且currentChunk不为空,则保存当前chunk并开始新的chunk
  //   if (currentChunk && (currentChunk.length + sentence.length > maxChunkSize)) {
  //     chunks.push(currentChunk);
  //     currentChunk = sentence;
  //   } else {
  //     // 否则将句子添加到当前chunk
  //     currentChunk = currentChunk
  //       ? `${currentChunk}。${sentence}`
  //       : sentence;
  //   }
  // }

  // // 添加最后一个chunk
  // if (currentChunk) {
  //   chunks.push(currentChunk);
  // }
  console.log(chunks);

  return chunks;
}

// 从文件中提取文本
async function extractText(file) {
  try {
    // 对于文本文件，直接读取内容
    if (file.type === 'text/plain') {
      return await file.text();
    }

    // 如果是PDF或Word文档，先转换为文本
    const buffer = await file.arrayBuffer();
    const text = await convertToText(buffer, file.type);
    return text;
  } catch (error) {
    console.error('提取文本失败:', error);
    throw new Error(`不支持的文件类型: ${file.type}`);
  }
}

// 文件格式转换为文本
async function convertToText(buffer, mimeType) {
  // 这里可以根据需要添加对PDF和Word的支持
  // 目前先支持纯文本
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
} 