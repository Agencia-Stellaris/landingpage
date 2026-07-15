import { useRef } from 'react'
import { useStarfield } from '@/estrategia-digital/hooks/useStarfield'
import styles from '@/estrategia-digital/styles/Background.module.css'

/** Campo de estrellas animado de fondo (decorativo). */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useStarfield(canvasRef)
  return <canvas ref={canvasRef} className={styles.starfield} aria-hidden="true" />
}
