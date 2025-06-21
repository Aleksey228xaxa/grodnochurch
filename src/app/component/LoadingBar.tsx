'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export const LoadingBar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    // Добавляем стили для анимации только на клиенте
    const style = document.createElement('style')
    style.textContent = `
      @keyframes loading {
        0% {
          width: 0%;
        }
        50% {
          width: 70%;
        }
        100% {
          width: 100%;
        }
      }
    `
    document.head.appendChild(style)

    setIsLoading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 100)

    const timer = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 200)
    }, 500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      // Удаляем стили при размонтировании компонента
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [pathname])

  if (!isLoading) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: typeof window !== 'undefined' && window.innerWidth <= 768 ? '8px' : '4px',
        backgroundColor: '#BF9460',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          height: '100%',
          backgroundColor: '#BF9460',
          width: `${progress}%`,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  )
} 