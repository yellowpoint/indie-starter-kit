"use client";

import { useRequest } from "ahooks";
import { Plus, RefreshCcw, Search, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DataTable } from "@/components/ui/data-table";
import { Textarea } from "@/components/ui/textarea";
import { AVAILABLE_MODELS, DEFAULT_MODEL } from "@/app/(ai)/providers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AIPromptPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const form = useForm({
    defaultValues: {
      name: "",
      promptContent: "",
      promptType: "dynamic",
      llm: DEFAULT_MODEL,
    },
  });

  const { data: promptData, loading, refresh } = useRequest(
    () =>
      fetch(`/api/crud?model=prompt&action=read&searchTerm=${searchTerm}`).then(
        (res) => res.json()
      ),
    {
      refreshDeps: [searchTerm],
    }
  );

  const { run: createPrompt, loading: creating } = useRequest(
    (data) =>
      fetch("/api/crud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "prompt",
          action: "create",
          data,
        }),
      }).then((res) => res.json()),
    {
      manual: true,
      onSuccess: (result) => {
        if (result.code === 0) {
          toast.success("创建成功");
          setIsCreateDrawerOpen(false);
          form.reset();
          refresh();
        } else {
          toast.error(result.message || "创建失败");
        }
      },
      onError: (error) => {
        toast.error("创建失败");
        console.error(error);
      },
    }
  );

  const { run: updatePrompt, loading: updating } = useRequest(
    (data) =>
      fetch("/api/crud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "prompt",
          action: "update",
          data,
        }),
      }).then((res) => res.json()),
    {
      manual: true,
      onSuccess: (result) => {
        if (result.code === 0) {
          toast.success("更新成功");
          setIsCreateDrawerOpen(false);
          setEditingRecord(null);
          form.reset();
          refresh();
        } else {
          toast.error(result.message || "更新失败");
        }
      },
      onError: (error) => {
        toast.error("更新失败");
        console.error(error);
      },
    }
  );

  const handleSubmit = (values) => {
    if (editingRecord) {
      updatePrompt({ ...values, id: editingRecord.id });
    } else {
      createPrompt(values);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch("/api/crud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "prompt",
          action: "delete",
          data: { id },
        }),
      });
      const result = await res.json();
      if (result.code === 0) {
        toast.success("删除成功");
        refresh();
      } else {
        toast.error(result.message || "删除失败");
      }
    } catch (error) {
      toast.error("删除失败");
      console.error(error);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.reset({
      name: record.name,
      promptContent: record.promptContent,
      promptType: record.promptType,
      llm: record.llm,
    });
    setIsCreateDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsCreateDrawerOpen(false);
    setEditingRecord(null);
    form.reset();
  };

  const columns = [
    { accessorKey: "name", header: "名称" },
    { accessorKey: "promptType", header: "类型" },
    { accessorKey: "llm", header: "模型" },
    {
      accessorKey: "createdAt",
      header: "创建时间",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              编辑
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600"
            >
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">AI Prompt管理</h1>

      <div className="mb-4 flex items-center justify-between">

        <Button onClick={() => setIsCreateDrawerOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          新建
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={promptData?.data?.list ?? []}
        searchKey="name"
        onSearch={setSearchTerm}
        onRefresh={refresh}
        loading={loading}
      />

      <Sheet open={isCreateDrawerOpen} onOpenChange={handleDrawerClose}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{editingRecord ? "编辑" : "新建"} Prompt</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "请输入名称" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名称</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="输入Prompt名称" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="promptContent"
                  rules={{ required: "请输入Prompt内容" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prompt内容</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="输入Prompt内容"
                          className="min-h-[200px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="promptType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>类型</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择类型" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="static">静态</SelectItem>
                          <SelectItem value="dynamic">动态</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="llm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>模型</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择模型" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {AVAILABLE_MODELS.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              {model.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={creating || updating}
                >
                  {creating || updating ? "提交中..." : (editingRecord ? "更新" : "创建")}
                </Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
} 