"use client";

import { useRequest } from 'ahooks';
import Image from 'next/image';
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/data-table";

export default function AIHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { data: historyData, loading, refresh } = useRequest(
    async () => {
      const res = await fetch(`/api/crud?model=aiHistory&action=read&page=${currentPage}&pageSize=${pageSize}&searchTerm=${searchTerm}`);
      return res.json();
    },
    {
      refreshDeps: [currentPage, searchTerm],
    }
  );

  const columns = [
    { accessorKey: "promptKey", header: "提示词关键字" },
    { accessorKey: "model", header: "模型" },
    {
      accessorKey: "createdAt",
      header: "创建时间",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => setSelectedRecord(row.original)}
        >
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">AI历史记录</h1>

      <DataTable
        columns={columns}
        data={historyData?.data?.list ?? []}
        searchKey="promptKey"
        onSearch={setSearchTerm}
        onRefresh={refresh}
        loading={loading}
        pageSize={pageSize}
      />

      <Dialog
        open={!!selectedRecord}
        onOpenChange={() => setSelectedRecord(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>AI详细信息</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">提示词：</h3>
                <ScrollArea className="h-[100px] rounded-md border p-4">
                  {selectedRecord.prompt}
                </ScrollArea>
              </div>

              {selectedRecord.imageUrl && (
                <div>
                  <h3 className="mb-2 font-semibold">图片：</h3>
                  <Image
                    src={selectedRecord.imageUrl}
                    alt="Generated Image"
                    className="max-h-[300px] w-auto rounded-md"
                  />
                </div>
              )}

              <div>
                <h3 className="mb-2 font-semibold">结果：</h3>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <pre className="whitespace-pre-wrap">
                    {selectedRecord.response}
                  </pre>
                </ScrollArea>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
