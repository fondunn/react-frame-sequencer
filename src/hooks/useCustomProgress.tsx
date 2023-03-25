import { useEffect, useState } from 'react'

export const useCustomProgress = (frames: number, ref: HTMLDivElement | null) => {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const startDelay = 0
    const scrollProgress = (ref: HTMLDivElement | null) => {
      if (ref) {
        const scrollpx = document.documentElement.scrollTop
        const offsetTop = ref!.offsetTop
        const offsetHeight = ref!.offsetHeight
        const stepPX = offsetHeight / frames
        const windowHeight = window.innerHeight
        if (scrollpx - offsetTop > startDelay && scrollpx - offsetTop <= offsetHeight - windowHeight) {
          const frame = Math.ceil((scrollpx - offsetTop) / stepPX)
          if (frame < frames) {
            setProgress(frame)
          } else {
            setProgress(frames)
          }
        }
      }
    }
    window.addEventListener('scroll', () => scrollProgress(ref))
    return () => window.removeEventListener('scroll', () => scrollProgress(ref))
  }, [ref, frames])

  return { progress }
}
