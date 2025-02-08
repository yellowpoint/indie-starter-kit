import { dynamicCrud } from "./dynamicCrud";

// 使用一个统一的处理函数来处理所有 HTTP 方法的请求
export async function handler(req) {
  return dynamicCrud(req);
}

// 为所有 HTTP 方法分配相同的处理函数
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
