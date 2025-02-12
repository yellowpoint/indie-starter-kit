"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, HelpCircle, Target, Clock, Rocket, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mindsetIssues = {
  motivation: {
    title: "动力维度",
    icon: Rocket,
    description: "解决「不想做」「没方向」的问题",
    problems: [
      "三分钟热度，长期难坚持",
      "需求模糊，不确定做什么",
      "缺乏正反馈，成就感低"
    ],
    solutions: [
      {
        title: "三圈定位法",
        example: "喜欢设计(兴趣) + 会Figma(技能) + 企业需要原型工具(市场) → Figma插件",
        detail: "绘制「兴趣-技能-市场」交集图,优先选择三圈重叠领域"
      },
      {
        title: "微成就系统",
        example: "每天完成3个1小时级任务,如'完成登录按钮UI'",
        detail: "拆解任务至1小时可完成颗粒度,每日记录3项进展"
      },
      {
        title: "人工反馈模拟",
        example: "开发AI工具前,先通过微信群手动回复用户问题",
        detail: "早期手动提供服务,直接获取价值感与反馈"
      }
    ]
  },
  confidence: {
    title: "信心维度",
    icon: Brain,
    description: "解决「不敢做」「怕失败」的问题",
    problems: [
      "技能焦虑（技术不够不敢开始）",
      "竞品恐惧（别人做得更好）",
      "自我怀疑（我的产品没价值）"
    ],
    solutions: [
      {
        title: "逆向工程训练",
        example: "从抄写Todo List开始,逐步添加新功能",
        detail: "GitHub上80%项目都是迭代出来的,不是一蹴而就"
      },
      {
        title: "竞品存在证明市场有效",
        example: "72%成功产品并非行业首创",
        detail: "用工具爬取竞品差评,针对性解决Top3痛点"
      },
      {
        title: "最小技术栈策略",
        example: "天气APP只需: API调用 + 数据展示 + 部署",
        detail: "用20%技术解决80%问题,放弃过度优化"
      }
    ]
  },
  execution: {
    title: "执行维度",
    icon: Target,
    description: "解决「做不好」「效率低」的问题",
    problems: [
      "完美主义（必须做完美才能发布）",
      "目标模糊（功能越加越多，偏离主线）",
      "行动瘫痪（一直在准备，从未开始）"
    ],
    solutions: [
      {
        title: "早期粗糙是必然的",
        example: "早期抖音视频压缩模糊,但抓住15秒短视频核心价值",
        detail: "把你的v0.1视为探针，而非最终形态"
      },
      {
        title: "20/80极简法则",
        example: "记账软件先做'快速记录+分类统计',放弃报表导出",
        detail: "用20%功能解决80%核心需求,剩余需求可能不存在"
      },
      {
        title: "作弊式任务拆解",
        example: "登录功能=抄代码→改UI→换API(每步≤1小时)",
        detail: "把复杂任务拆解为1小时内可完成的小步骤"
      }
    ]
  }
};

const dailyQuestions = {
  motivation: [
    "今天完成了哪3个微小任务？",
    "用户反馈中最让我有成就感的是什么？",
    "我的项目是否还在三圈重叠区域？"
  ],
  confidence: [
    "今天学习/修改了几行代码？",
    "竞品的哪些问题是我能解决的？",
    "能用更简单的技术栈实现核心功能吗？"
  ],
  execution: [
    "是否允许这个功能先做得差一点？",
    "能再删掉哪些非必需功能？",
    "如何把当前任务再拆小一点？"
  ]
};

const selfDoubtGuide = {
  cognition: {
    title: "认知重塑",
    description: `为什么"自我怀疑"反而是优势`,
    items: [
      {
        title: "早期粗糙是必然的",

        example: "Instagram最初是复杂的签到应用Burbn",
        detail: "把你的v0.1视为探针，而非最终形态"
      },
      {
        title: "需求模糊是发现机会的信号",
        example: "VS Code通过插件生态满足涌现需求",
        detail: "从满足明确需求转向构建需求涌现平台"
      },

      {
        title: "竞品存在证明市场有效",
        example: "72%成功产品并非行业首创",
        detail: "只要有10%体验提升，用户就有迁移可能"
      }
    ]
  },
  validation: {
    title: "需求验证四步法",
    steps: [
      {
        name: "痛苦日志",
        description: "连续7天记录挫败时刻",
        action: "找出频率≥3次的问题"
      },
      {
        name: "需求暴力测试",
        description: "验证支付意愿与差异化",
        action: "收集预付款与差评分析"
      },
      {
        name: "反脆弱MVP",
        description: "最低成本测试核心假设",
        action: "留存率>50%或付费率>3%"
      },
      {
        name: "用户共谋计划",
        description: "招募5个种子用户",
        action: "提供特权换取深度反馈"
      }
    ]
  },
  competition: {
    title: "对抗竞品焦虑",
    strategies: [
      {
        name: "竞品解剖术",
        description: "找到产品的失语区",
        steps: ["深度使用竞品", "记录沉默时刻", "攻击盲点"]

      },
      {
        name: "寄生虫策略",
        description: "借势巨头生态成长",
        examples: ["开发Figma插件", "做Prompt工具"]
      },
      {
        name: "低端颠覆模型",
        description: "服务够用就好用户",
        example: "Zoom对标Skype的崛起"
      }

    ]
  },
  actionPlan: {
    title: "48小时自救计划",
    days: [
      {
        title: "Day 1：需求暴力验证",
        schedule: [
          "09:00-12:00 写痛苦日志",
          "14:00-18:00 手动模拟方案",
          "20:00-22:00 招募测试用户"
        ]
      },
      {
        title: "Day 2：MVP构建",
        schedule: [
          "09:00-12:00 构建原型",
          "14:00-17:00 用户测试",
          "19:00-21:00 发布产品"
        ]
      }
    ]
  }
};

export default function MindsetPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">心态指南</h1>
        <p className="text-muted-foreground">
          调整心态,建立正确的独立开发思维模式
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="motivation" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="motivation" className="space-x-2">
              <Rocket className="h-4 w-4" />
              <span>动力维度</span>
            </TabsTrigger>
            <TabsTrigger value="confidence" className="space-x-2">
              <Brain className="h-4 w-4" />
              <span>信心维度</span>
            </TabsTrigger>
            <TabsTrigger value="execution" className="space-x-2">
              <Target className="h-4 w-4" />
              <span>执行维度</span>
            </TabsTrigger>
          </TabsList>

          {Object.entries(mindsetIssues).map(([key, section]) => (
            <TabsContent key={key} value={key}>
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`rounded-full p-2 ${key === 'motivation' ? 'bg-purple-500' :
                    key === 'confidence' ? 'bg-blue-500' :
                      'bg-green-500'
                    } bg-opacity-10`}>
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">典型问题</h3>
                  <div className="space-y-2">
                    {section.problems.map((problem, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                        <p className="text-sm">{problem}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm font-medium">解决方案</h3>
                  {section.solutions.map((solution, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="font-medium">{solution.title}</h4>
                      <p className="text-sm text-muted-foreground">{solution.example}</p>
                      <p className="text-sm bg-muted p-3 rounded-lg">{solution.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full p-2 bg-yellow-500 bg-opacity-10">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">每日自我提问</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(dailyQuestions).map(([category, questions]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-sm font-medium capitalize">{category}</h3>
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-muted rounded-lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <p>{question}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

    </div>
  );
} 