import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { processDocument } from "@/lib/document-processor";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // 处理文档并创建嵌入
    const { chunks, metadata } = await processDocument(file);

    // 保存文档和chunks到数据库
    const document = await prisma.document.create({
      data: {
        name: file.name,
        ...metadata,
        chunks: {
          create: chunks.map(chunk => ({
            content: chunk.content,
            embedding: chunk.embedding
          }))
        }
      },
      include: {
        chunks: true
      }
    });

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        name: document.name
      }
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 