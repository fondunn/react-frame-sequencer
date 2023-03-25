import { useCustomProgress } from '../../hooks/useCustomProgress'
import { useScreenSize } from '../../hooks/useScreenSize'
import { drawImage, drawOneImage } from '../../utils/drawImage'
import { preloadImages } from '../../utils/preloadImages'
import React, { FC, useEffect, useRef, useState } from 'react'

export interface IImages {
  [key: number]: HTMLImageElement
}

export interface ISequencePlayer {
  framesCount: number
  imagesPath: string
  imagesPrefix?: string
  imagesType: string
  speed?: number
  children?: string | JSX.Element | JSX.Element[]
}

const FrameSequencer: FC<ISequencePlayer> = ({
  framesCount,
  imagesPath,
  imagesPrefix = '',
  imagesType,
  speed = 10,
  children,
}) => {
  const [images, setImages] = useState<IImages | null>(null)
  const { width, height } = useScreenSize()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  const { progress } = useCustomProgress(framesCount, playerRef.current)

  useEffect(() => {
    preloadImages(framesCount, imagesPath, imagesPrefix, imagesType).then((res: IImages) => {
      setImages(res)
    })
  }, [framesCount, imagesPath, imagesPrefix, imagesType])

  useEffect(() => {
    if (canvasRef) {
      canvasRef!.current!.width = width
      canvasRef!.current!.height = height
    }
  }, [width, height, canvasRef])

  useEffect(() => {
    if (images) {
      if (progress < 1) {
        drawOneImage({
          image: images[1],
          canvas: canvasRef.current,
          width,
          height,
        })
      } else {
        drawImage({
          image: images[progress],
          canvas: canvasRef.current,
          width,
          height,
        })
      }
    }
  }, [width, height, images, progress])
  return (
    <div
      ref={playerRef}
      style={{
        position: 'relative',
        scrollBehavior: 'smooth',
        height: framesCount * speed,
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'sticky', top: 0 }} />
      <div style={{ zIndex: 10, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>{children}</div>
    </div>
  )
}

export default FrameSequencer
