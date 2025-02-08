"use client";

import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import cloud from 'd3-cloud';

const words = [
  // 从倦怠页面
  { text: "职业倦怠", value: 60 },
  { text: "自主权", value: 40 },
  { text: "工作过载", value: 45 },
  { text: "价值冲突", value: 42 },
  { text: "社会支持", value: 38 },
  { text: "恢复策略", value: 50 },

  // 从心流页面
  { text: "心流体验", value: 65 },
  { text: "意识控制", value: 48 },
  { text: "注意力", value: 55 },
  { text: "精神熵", value: 42 },
  { text: "目标设定", value: 52 },

  // 从创造力页面
  { text: "创造力", value: 58 },
  { text: "想象网络", value: 45 },
  { text: "注意网络", value: 43 },
  { text: "突显网络", value: 40 },

  // 从学习页面
  { text: "学习助手", value: 50 },
  { text: "AI应用", value: 48 },
  { text: "知识结构", value: 45 },

  // 其他关键概念
  { text: "快乐", value: 55 },
  { text: "成长", value: 50 },
  { text: "突破", value: 45 },
  { text: "自我提升", value: 48 },
  { text: "持续进步", value: 46 },
];

export function WordCloud({ width = 800, height = 400 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // 清除已有内容
    d3.select(svgRef.current).selectAll("*").remove();

    const layout = cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => 0)
      .fontSize(d => d.value)
      .on("end", draw);

    layout.start();

    function draw(words) {
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      d3.select(svgRef.current)
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", d => `${d.size}px`)
        .style("font-family", "var(--font-geist-sans)")
        .style("fill", (_, i) => color(i))
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text)
        .style("cursor", "pointer")
        .on("mouseover", function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style("font-size", d => `${d.size * 1.2}px`);
        })
        .on("mouseout", function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style("font-size", d => `${d.size}px`);
        });
    }
  }, [width, height]);

  return (
    <div className="relative w-full overflow-hidden">
      <svg
        ref={svgRef}
        className="mx-auto"
        style={{
          maxWidth: "100%",
          height: "auto"
        }}
      />
    </div>
  );
} 