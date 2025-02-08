"use client"

import { useRef, useEffect } from "react"
import Fireworks from "react-canvas-confetti/dist/presets/fireworks"

// 创建一个全局事件触发器和事件名称常量
const FIREWORK_EVENT = 'trigger-firework'

export const triggerFirework = () => {
  // 使用自定义事件来触发烟花
  window.dispatchEvent(new CustomEvent(FIREWORK_EVENT))
}

export function Firework() {
  const conductorRef = useRef(null)

  useEffect(() => {
    // 事件处理函数
    const handleFirework = () => {
      if (conductorRef.current) {
        conductorRef.current.run({
          speed: 3,
          duration: 1000,
          intensity: 25,
          particles: 100,
        })
      }
    }

    // 添加事件监听器
    window.addEventListener(FIREWORK_EVENT, handleFirework)

    // 清理函数
    return () => {
      window.removeEventListener(FIREWORK_EVENT, handleFirework)
    }
  }, [])

  return (
    <Fireworks
      onInit={({ conductor }) => {
        conductorRef.current = conductor
      }}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
} 