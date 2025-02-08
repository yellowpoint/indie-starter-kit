'use client'

import Script from 'next/script'

export function CozeScript() {
  return (
    <Script
      src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.0/libs/cn/index.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.CozeWebSDK && new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: '7450317741238239244',
          },
          componentProps: {
            title: 'Coze',
          },
        });
      }}
    />
  )
} 