"use client";

import { useRequest } from "ahooks";
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
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AVAILABLE_MODELS, DEFAULT_MODEL } from "@/app/(ai)/providers";

export default function LLMPlayground() {
  const form = useForm({
    defaultValues: {
      model: DEFAULT_MODEL,
      returnObject: false,
    },
  });
  const [fileList, setFileList] = useState([]);
  const [response, setResponse] = useState("");
  const [prompts, setPrompts] = useState([]);

  const { loading: promptsLoading } = useRequest(
    () => fetch("/api/crud?model=prompt&action=read").then((res) => res.json()),
    {
      onSuccess: (result) => {
        if (result.code === 0) {
          setPrompts(result.data.list);
        } else {
          console.error("Failed to load prompts:", result.data);
        }
      },
    },
  );

  const { run: callLLM, loading: llmLoading } = useRequest(
    (params) =>
      fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      }).then((res) => res.json()),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.code === 0) {
          setResponse(data.data.text);
        } else {
          setResponse(data.error || "调用LLM失败");
          toast.error(data.error || "调用LLM失败");
        }
      },
      onError: (error) => {
        toast.error("调用LLM时发生错误");
        console.error(error);
      },
    },
  );

  const handlePromptChange = (value) => {
    const selectedPromptData = prompts.find((p) => p.name === value);
    if (selectedPromptData) {
      form.setValue("promptContent", selectedPromptData.promptContent);
    }
  };

  const handleSubmit = async (values) => {
    if (!values.promptKey || (!values.content && fileList.length === 0)) {
      toast.warning("请选择Prompt并输入内容或上传图片");
      return;
    }

    let imageUrl = "";
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.url;
      } catch (error) {
        toast.error("图片上传失败");
        console.error(error);
        return;
      }
    }

    callLLM({
      ...values,
      imageUrl,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">LLM Playground</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>选择模型</FormLabel>
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="promptKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>选择Prompt</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handlePromptChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择Prompt" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {prompts.map((prompt) => (
                      <SelectItem key={prompt.id} value={prompt.name}>
                        {prompt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="promptContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt内容</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="输入Prompt内容"
                    className="min-h-[100px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>输入内容</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="输入内容"
                    className="min-h-[100px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="returnObject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>返回格式</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择返回格式" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="false">文本</SelectItem>
                    <SelectItem value="true">对象</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={llmLoading}>
            {llmLoading ? "提交中..." : "提交"}
          </Button>
        </form>
      </Form>

      {response && (
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">响应结果</h2>
          <ScrollArea className="h-[300px] rounded-md border p-4">
            <pre
              className={`whitespace-pre-wrap ${form.getValues("returnObject") ? "whitespace-pre" : ""
                }`}
            >
              {response}
            </pre>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
