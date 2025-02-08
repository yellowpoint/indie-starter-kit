"use client";

import { motion } from "framer-motion";
import {
  Map,
  Compass,
  Target,
  Brain,
  Users,
  Heart,
  Lightbulb,
  BarChart,
  ClipboardCheck,
  Search,
  Sparkles,
  Activity,
  History,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const lifeDesign = {
  title: "我的人生设计",
  subtitle: "探索自我,寻找热爱",
  icon: Target,
  content: [
    {
      title: "分析现状",
      subtitle: "了解当前处境",
      icon: Search,
      content: [
        {
          subtitle: "生活仪表盘",
          text: `工作(4/10): 之前主业是前端开发，现在待业，以及周末兼职带带户外队，各种学习也算在里面吧，觉得投入太多精力了，且只是迷茫的瞎忙，并不是很乐在其中，当然也不是很痛苦。\n\n娱乐(3/10): 看电影、玩游戏没之前那么投入放松了，和朋友聚会、户外还不错。\n\n爱(1/10): 大多是一个人。\n\n健康(6/10): 身体经常运动还行吧就是小肥了些，心理现在主要是焦虑迷茫，但也一直在学习心理学相关书籍，以及做正念冥想。`,
          highlight: true
        },
        {
          subtitle: "人生观察",
          text: "工作观：通过工作来向外界换取成就感、价值感、存在感，姿态很低\n\n人生观：在外界目标下一路追逐，对爱逃避，害怕冲突"
        }
      ],
      color: "bg-blue-500"
    },
    {
      title: "价值观探索",
      subtitle: "发现内在动力",
      icon: Heart,
      content: [
        {
          subtitle: "性格特征",
          text: "- ESFJ型人格:外向、实体、感性、计划\n- 盖洛普优势:成就、纪律、分析、追求、专注\n- 玛雅图腾:蓝手",
          highlight: true
        },
        {
          subtitle: "核心价值观",
          text: "- 好奇心、求知欲、表达欲、成就感\n- 喜欢解决与挑战明确且限时的问题\n- 社交时，喜欢陌生人一起游戏交流"
        }
      ],
      color: "bg-purple-500"
    },
    {
      title: "能量地图",
      subtitle: "发现你的动力",
      icon: Map,
      content: [
        {
          subtitle: "高能量活动",
          text: "- 写代码：任务明确、反馈及时容易沉入其中，学新知识并实践的快乐，解决问题的成就感\n- 户外与社交：好奇心、探索欲、以及和周围人分享交流很畅快，享受被关注\n- 正念冥想：缓解情绪问题，提供平静感\n- 骑车：基本功能是快速沉浸，享受过程，暂时忘记痛苦",
          highlight: true
        },
        {
          text: "通过能量追踪,找到隐藏的机会和方向",
          emphasis: true
        }
      ],
      color: "bg-yellow-500"
    },
    {
      title: "方案设计",
      subtitle: "探索多种可能",
      icon: Target,
      content: [
        {
          subtitle: "三个版本的五年计划",
          text: "1. 程序员路线\n- 大厂发展：继续程序员生涯，进大厂\n- 独立开发：做自己的软件，且能到处跑\n\n2. 影视创作\n- 将自己脑中画面表达出来\n- 从短片开始，逐步掌握技能\n\n3. 创意结合\n- 户外/露营/旅游项目 + 体验/疗愈/修行\n- 编程马拉松 + 旅行：找个风景好的地方举办编程马拉松",
          highlight: true
        },
        {
          text: "不要等待完美方案出现，重要的是拥有多个可能性",
          emphasis: true
        }
      ],
      color: "bg-green-500"
    },
    {
      title: "原型测试",
      subtitle: "小规模尝试",
      icon: Sparkles,
      content: [
        {
          subtitle: "人生访谈",
          text: "采访内容创作者的经验：\n- 目前来说很喜欢做内容，因为很喜欢思考和表达\n- 无论是文字、视频、舞蹈，都是向世界的表达方式\n- 花了好几年时间在思考这个问题",
          highlight: true
        },
        {
          subtitle: "实地体验",
          text: "在投入前进行测试：\n- 远程工作体验\n- 影视制作实习\n- 户外活动带队"
        }
      ],
      color: "bg-red-500"
    },
    {
      title: "决策执行",
      subtitle: "开始行动",
      icon: Target,
      content: [
        {
          subtitle: "近期行动",
          text: "1. 在探索自己的同时积极尝试各种职业可能性\n2. 尝试投递感兴趣的工作：旅游、脱口秀等\n3. 注意经济平衡，物质匮乏会影响心态\n4. 保持信心和开放的心态",
          highlight: true
        },
        {
          text: "找热爱是一个过程，甚至是一个很长的过程。可以先找个靠近一点点的工作，不是一步实现，也不是一定要找到了才能开始行动。",
          emphasis: true
        }
      ],
      color: "bg-indigo-500"
    }
  ]
};

export default function MyLifeDesignPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">{lifeDesign.title}</h1>
        <p className="text-muted-foreground">{lifeDesign.subtitle}</p>
      </motion.div>

      <Tabs defaultValue="section-1" className="w-full">
        <TabsList className="grid grid-cols-6 h-auto">
          {lifeDesign.content.map((section, index) => (
            <TabsTrigger
              key={`section-${index + 1}`}
              value={`section-${index + 1}`}
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary/10"
            >
              <div className={`rounded-full p-2 ${section.color} bg-opacity-10`}>
                <section.icon className="h-5 w-5" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">{section.title}</div>
                <div className="text-xs text-muted-foreground">
                  {section.subtitle}
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {lifeDesign.content.map((section, index) => (
          <TabsContent
            key={`section-${index + 1}`}
            value={`section-${index + 1}`}
            className="mt-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {section.content.map((item, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border ${item.highlight
                    ? "bg-primary/5 border-primary/20"
                    : "bg-card border-border"
                    }`}
                >
                  {item.subtitle && (
                    <h3 className="font-medium mb-2">{item.subtitle}</h3>
                  )}
                  <p
                    className={`whitespace-pre-line ${item.emphasis ? "text-primary font-medium" : ""
                      }`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 