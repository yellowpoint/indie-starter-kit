"use client";

import { Brain, Heart, Target, AlertCircle, Lightbulb, History } from "lucide-react";
import FlowPageLayout from "@/components/flow-page-layout";

const sections = [
  {
    title: "为什么不快乐？",
    icon: AlertCircle,
    content: [
      {
        text: "宇宙不以人类为中心，世界不为快乐而设计。",
        highlight: true
      },
      {
        text: "因为无止境的欲望，随着生活水准的提升，财富与权力使期望也迅速升高，我们对幸福的定义也越来越模糊，越不满足，提高生活品质成了一件永远没有尽头的苦役。"
      },
      {
        text: "其实只要我们在奋斗的过程中觉得愉快，设立新目标也没什么不好；但问题就在于一般人总把所有心力放在新目标上，不能享受现在，也因此与知足的快乐绝缘。",
        emphasis: true
      }
    ],
    color: "bg-red-500",
  },
  {
    title: "反思生命",
    icon: Brain,
    content: [
      {
        text: '人渐渐长大，从满怀希望的无知少年，长成冷静沉稳的大人，他们早晚会面临一个疑问："这就是一切吗？"',
        highlight: true
      },
      {
        text: "童年或许令人痛苦，青春期或许令人困惑，但对大多数人而言，痛苦与困惑的背后，至少还有个长大后一切会好转的希望，而这种希望使目标变得有意义。"
      },
      {
        text: `然而不可避免的是，浴室的镜子照出了第一根白发，多出的那几斤赘肉再也减不掉了，视力开始衰退，全身上下也冒出莫名其妙的疼痛。各种老化的迹象明白地告诉你："你的时间快到了，准备动身吧！"但难得有人这时候就已准备妥当。`
      },
      {
        text: "我们早晚会有所觉悟，发现这个富裕、科学昌明的复杂世界，根本不可能把幸福拱手奉上。",
        emphasis: true
      }
    ],
    color: "bg-purple-500",
  },
  {
    title: "失效的方法",
    icon: Target,
    content: [
      {
        text: "觉悟来临时，每个人都以不同的方式面对：",
        highlight: true
      },
      {
        subtitle: "常见应对方式",
        text: "- 有些人继续追求更多所谓美好的东西\n- 有些人则选择直接对症下药\n- 有些人干脆投降认输，躲进自己的小天地\n- 也有越来越多心灵空虚无助的人纷纷求助于宗教"
      },
      {
        text: "上述这些解决方案都不再管用，我们生存的社会，物质享受虽已至巅峰，却仍受种种疑难杂症所苦。",
        emphasis: true
      }
    ],
    color: "bg-yellow-500",
  },
  {
    title: "社会制约与本能冲动",
    icon: Heart,
    content: [
      {
        text: "在复杂的社会中求生，绝对有必要为实现外在目标暂时牺牲一时的满足，但不必因此而成为傀儡。",
        highlight: true
      },
      {
        text: "最好的方法是不以社会的奖赏为念，试着以自己所能控制的奖赏取而代之。"
      },
      {
        text: "从社会制约下解放自我，最重要的步骤就是时时刻刻发掘每一事件中的回馈。"
      },
      {
        text: "但光是放纵本能的欲望，并不等于摆脱社会制约，我们还得超脱肉体的欲望，学习控制意识。",
        emphasis: true
      }
    ],
    color: "bg-green-500",
  },
  {
    title: "看看老祖宗",
    icon: History,
    content: [
      {
        text: "生活的品质取决于控制意识的能力，这是人类早已知道的简单事实。",
        highlight: true
      },
      {
        text: "古希腊的古典禁欲主义、基督教僧侣的苦修、印度瑜伽、中国道教及佛教禅宗、以及近年出现的心理分析，目的也是从本能冲动与社会制约下解放意识。"
      },
      {
        subtitle: "为何无进展？",
        text: "如果人类真的几千年来一直懂得得到自由、控制自己生活的方法，为什么会在这方面毫无进展呢？"
      },
      {
        text: "- 首先，解放意识的知识，需要每个人自行从不断的尝试与错误中学习\n- 其次，控制意识的知识在文化背景改变时，也必须进行相应调整",
        emphasis: true
      }
    ],
    color: "bg-blue-500",
  },
  {
    title: "小结",
    icon: Lightbulb,
    content: [
      {
        text: "我们从生活中得到的快乐，取决于心灵如何过滤与阐释日常体验。快乐与否，端视内心是否和谐，而与我们控制宇宙的能力毫无关系。",
        highlight: true
      },
      {
        text: "控制意识才能控制体验的品质，任何在这方面最起码的进步都足以提升生活的品质，使生活更快乐、更有意义。"
      },
      {
        text: "在设法改善体验品质之前，下一章将了解下意识的运作方式以及体验的真正意义。",
        emphasis: true
      }
    ],
    color: "bg-indigo-500",
  },
];

export default function WhyNotHappyPage() {
  return <FlowPageLayout title="为什么不快乐" sections={sections} />;
} 