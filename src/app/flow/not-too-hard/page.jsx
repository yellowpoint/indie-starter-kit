"use client";

import { Brain, Heart, Leaf, Sparkles, AlertCircle, Lightbulb } from "lucide-react";
import FlowPageLayout from "@/components/flow-page-layout";

const sections = [
  {
    title: "大脑与小我",
    icon: Brain,
    content: [
      {
        text: "大脑总是不满足，总是渴求更多。当你认同了大脑，就容易觉得无聊与焦躁不安。",
        highlight: true
      },
      {
        text: "当每个想法都能占据全部注意力时，表示你完全认同了大脑，这些想法赋予了自我感，小我便产生了。"
      },
      {
        text: "大脑创造的小我残缺不全、飘摇不定，恐惧和渴望便是主要情绪与动力。",
        emphasis: true
      }
    ],
    color: "bg-purple-500",
  },
  {
    title: "当下的力量",
    icon: Sparkles,
    content: [
      {
        text: "万物皆源于当下，当下并非实现目的的手段，你在每一刻所做的事情足以令人满意！",
        highlight: true
      },
      {
        text: "小我不停地寻找东西来填补它的残缺，这就是它专注未来的原因，当下的时刻被贬低为实现未来目标的手段，但当目标实现，又会有新的目标，永不满足，永无快乐。"
      },
      {
        text: "一次只做一件事，意味着全身心地投入到所做事情中，这是一个臣服的行为，也是被赋予力量的行为。",
        emphasis: true
      }
    ],
    color: "bg-yellow-500",
  },
  {
    title: "接纳现实",
    icon: Heart,
    content: [
      {
        text: "全然接受现实情况，表面上还是会因为阳光灿烂而心花怒放，因为阴雨连绵而愁眉不展。",
        highlight: true
      },
      {
        text: "然而，无论开心、难过都变得不那么重要，只是表面的一层涟漪，内在始终平和泰然。不依赖外部条件，也不依赖思想和情感的不停波动。"
      },
      {
        text: "当你不再对事物抱有不合理的期待时，它们都变得令人满意，更加和谐、平和。",
        emphasis: true
      }
    ],
    color: "bg-green-500",
  },
  {
    title: "自然的教育",
    icon: Leaf,
    content: [
      {
        text: "一棵树、一块岩石、一个动物，关注它并不意味着思考它，你只需观察，把它带入你的意识。它会把它本质的东西传递给你，宁静。",
        highlight: true
      },
      {
        text: "大自然不是一个用来谋取利益、知识的商店。大自然也需要你，通过你察觉到自己的存在，它一直在等你，数百万年之久。"
      },
      {
        text: "自然的教育是免费的，它教会我们如何活在当下。",
        emphasis: true
      }
    ],
    color: "bg-blue-500",
  },
  {
    title: "觉知的力量",
    icon: AlertCircle,
    content: [
      {
        text: "无意识地给自己制造痛苦，解决很简单，把它们变成有意识的行为，发生的时候察觉到它们。",
        highlight: true
      },
      {
        text: "你不可能在有意识的同时，还给自己制造痛苦。"
      },
      {
        text: `接受你的"不知道"，现实很多情况没有答案，无法解释。放弃挣扎着用有限的大脑寻求答案。`,
        emphasis: true
      }
    ],
    color: "bg-red-500",
  },
  {
    title: "小结",
    icon: Lightbulb,
    content: [
      {
        text: "所有经历都是短暂易逝的，世界无法给你任何永恒价值的东西，这让臣服变得简单。",
        highlight: true
      },
      {
        text: "你依然会和他人相遇，卷入各种经历，参加各种活动，但没有小我的恐惧与欲望。"
      },
      {
        text: "全然接受当下，不和现实情况争辩，强迫性的思维减少，内在的抵抗减少了。生活不必太用力。",
        emphasis: true
      }
    ],
    color: "bg-indigo-500",
  }
];

export default function NotTooHardPage() {
  return <FlowPageLayout title="人生不必太用力" sections={sections} />;
} 