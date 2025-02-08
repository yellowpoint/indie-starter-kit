"use client";

import { Target, AlertTriangle, Crosshair, Brain, Compass, Lightbulb } from "lucide-react";
import FlowPageLayout from "@/components/flow-page-layout";

const sections = [
  {
    title: "心流要素",
    icon: Target,
    content: [
      {
        text: "心流 = 全神贯注（沉浸感）+ 自我进步（满足感）",
        highlight: true
      },
      {
        subtitle: "全神贯注的条件",
        text: "为了达到全神贯注，需要明确目标、适度挑战、即时回馈，之后会出现忘记自我、忘记时间，可作为判断标准。"
      },
      {
        subtitle: "满足感来源",
        text: "满足感的来源也就是和内在目标的对比，基因、社会、以及过往的所有经历塑造了内在目标，可能无法用意识的语言表达出来，但其一直在起作用。"
      },
      {
        subtitle: "典型例子",
        text: "- 打一天游戏，过程有沉浸感，但事后自我评价，发现不符合目标，没有满足感，进而有懊悔。\n- 学习英语，过程没有沉浸感，靠意志力强撑，事后有满足感，但难以开始下次学习。"
      },
      {
        text: "要么在有沉浸感的事情里找满足感，也就是改造内在目标；要么在有满足感的事情里找沉浸感，也就是通过平衡难度、及时反馈，明确目标等技巧。",
        emphasis: true
      }
    ],
    color: "bg-blue-500",
  },
  {
    title: "心流上瘾",
    icon: AlertTriangle,
    content: [
      {
        text: "任何有乐趣的活动几乎都会上瘾，当一个人沉溺于此，不能再顾及其他事时，他就丧失了最终的控制权，亦即决定意识内涵的自由。",
        highlight: true
      },
      {
        text: "这么一来，产生心流的活动就有可能导致负面的效果：虽然它还能创造心灵的秩序，提升生活的品质，但由于上瘾，自我便沦为某种特定秩序的俘虏，不愿再去适应生活中的暧昧和模糊。"
      },
      {
        text: "（难道我们的目标不就是更长时间的心流状态吗，和上瘾的界限在哪？）",
        emphasis: true
      }
    ],
    color: "bg-yellow-500",
  },
  {
    title: "自成目标",
    icon: Crosshair,
    content: [
      {
        text: `"自成目标"指的是做一件事不追求未来的报酬，做这件事本身就是最大的回馈。`,
        highlight: true
      },
      {
        text: "我们所做的事，大多既不是纯粹的自成目标，也不是纯粹的外求目标（亦即全然为超乎行动之外的目标而采取的行动），而是两者的综合。",
        emphasis: true
      }
    ],
    color: "bg-green-500",
  },
  {
    title: "意识的代价",
    icon: Brain,
    content: [
      {
        text: "当不再完全受直觉和反射作用限制就有了选择，代价就是灵魂的纷扰难安。",
        highlight: true
      },
      {
        text: "处理资讯的能力越强，内在冲突的可能性也随之增加。面临太多要求、选择及挑战，我们会觉得焦虑；但太少时，我们又觉得厌烦。"
      },
      {
        text: "建立在天真无邪基础上的秩序，对我们已是遥不可及。一旦摘下知识树上的果实，重返伊甸园的路就永远被封闭了。",
        emphasis: true
      }
    ],
    color: "bg-purple-500",
  },
  {
    title: "最终目标",
    icon: Compass,
    content: [
      {
        subtitle: "短期与长期",
        text: "为心灵创造短时间的秩序并非难事：只要有个切合实际的目标，就能做到这一点。好好玩一场、工作出现转机、家人愉快的聚会，都能集中注意力，创造和谐的心流体验。但把这种状态延长为整个人生历程，就困难多了，需要一个极具说服力的目标。",
        highlight: true
      },
      {
        subtitle: "目标的意义",
        text: "最终目标只要能为一生的精神能量建立秩序，它本身是什么并不重要。它可能成为啤酒瓶收藏家、找出癌症疗法或纯属生物本能——希望儿女过得好，光耀门楣。只要方向明确，行动规则清楚，并能提供集中注意力的方法，任何目标都能使人的一生充满意义。"
      },
      {
        text: "制定的目标完成多少也不重要，重要的是他有没有为实现目标而努力，不让自己的精力消散或浪费掉。"
      },
      {
        text: "我们怎么知道把精神能量投注在哪方面呢？没有人会挺身而出告诉我们：这就是值得你一生投入的目标。因为该走哪个方向没有定论，每个人都必须发掘自己的终极目标。经过尝试与犯错，经过努力学习，我们才能把纷乱的目标理出头绪，挑出能带给行动方向感的那一个。",
        emphasis: true
      }
    ],
    color: "bg-indigo-500",
  }
];

export default function FlowElementsPage() {
  return <FlowPageLayout title="心流要素" sections={sections} />;
} 