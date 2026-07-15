import { useEffect, type RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface Star {
  x: number
  y: number
  radius: number
  alpha: number
  speed: number
  twinkle: number
  phase: number
  warm: boolean
}

const MAX_STARS = 160
const DENSITY_DIVISOR = 12000

/** Anima un campo de estrellas sobre un <canvas>. Respeta prefers-reduced-motion. */
export function useStarfield(canvasRef: RefObject<HTMLCanvasElement | null>): void {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Star[] = []
    let width = 0
    let height = 0
    let frameId = 0

    const seed = () => {
      const count = Math.min(MAX_STARS, Math.floor((width * height) / DENSITY_DIVISOR))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.15 + 0.02,
        twinkle: Math.random() * 0.02 + 0.004,
        phase: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.15,
      }))
    }

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      seed()
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const star of stars) {
        star.y += star.speed
        if (star.y > height) {
          star.y = 0
          star.x = Math.random() * width
        }
        const alpha = Math.max(0, star.alpha + Math.sin(time * star.twinkle + star.phase) * 0.25)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.warm ? `rgba(240,120,180,${alpha})` : `rgba(220,215,240,${alpha})`
        ctx.fill()
      }
      frameId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef, prefersReducedMotion])
}
