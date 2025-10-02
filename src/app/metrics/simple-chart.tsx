'use client'
import { useEffect, useRef } from 'react'

// Tiny canvas chart to avoid pulling a big chart lib
export default function SimpleChart() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    const w = el.width, h = el.height
    ctx.clearRect(0,0,w,h)
    const data = Array.from({length: 20}, (_,i)=> Math.sin(i/2)*30 + 50 + Math.random()*10)
    ctx.beginPath()
    ctx.moveTo(0, h - data[0])
    for (let i=1;i<data.length;i++){
      const x = (i/(data.length-1))*w
      const y = h - data[i]
      ctx.lineTo(x,y)
    }
    ctx.stroke()
  }, [])
  return <canvas ref={ref} width={600} height={160} style={{width:'100%', height:160}}/>
}
