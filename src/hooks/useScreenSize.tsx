import { useEffect, useState } from 'react'

export const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number
    height: number
  }>({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return {
    width: windowSize.width,
    height: windowSize.height,
  }
}
