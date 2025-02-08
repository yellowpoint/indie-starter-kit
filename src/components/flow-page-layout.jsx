"use client";

import { motion } from "framer-motion";

export default function FlowPageLayout({ title, sections }) {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        {title}
      </motion.h1>

      {sections.map((section, index) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl border bg-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`rounded-full p-2 ${section.color} bg-opacity-10`}>
              <section.icon className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">{section.title}</h2>
          </div>
          <div className="space-y-4">
            {section.content.map ? (
              // 处理结构化内容
              section.content.map((item, i) => (
                <div key={i} className="space-y-2">
                  {item.subtitle && (
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {item.subtitle}
                    </h3>
                  )}
                  <p className={`
                    ${item.highlight ? 'text-lg font-medium' : 'text-muted-foreground'}
                    ${item.emphasis ? 'italic' : ''}
                  `}>
                    {item.text}
                  </p>
                </div>
              ))
            ) : (
              // 处理纯文本内容
              <div className="prose prose-sm max-w-none">
                {section.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
} 