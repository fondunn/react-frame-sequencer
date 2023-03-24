import { useCustomProgress } from "../hooks/useCustomProgress";
import { useScreenSize } from "../hooks/useScreenSize";
import { IImages, ISequencePlayer } from "../lib/types";
import { drawImage, drawOneImage } from "../utils/drawImage";
import { preloadImages } from "../utils/preloadImages";
import styles from "./SequencePlayer.module.scss";
import { FC, useEffect, useRef, useState } from "react";

export const SequencePlayer: FC<ISequencePlayer> = ({
  framesCount,
  imagesPath,
  imagesPrefix = "",
  imagesType,
  speed = 10,
  children,
}) => {
  const [images, setImages] = useState<IImages | null>(null);
  const { width, height } = useScreenSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const { progress } = useCustomProgress(framesCount, playerRef.current);

  useEffect(() => {
    preloadImages(framesCount, imagesPath, imagesPrefix, imagesType).then(
      (res: IImages) => {
        setImages(res);
      }
    );
  }, [framesCount, imagesPath, imagesPrefix, imagesType]);

  useEffect(() => {
    if (canvasRef) {
      canvasRef!.current!.width = width;
      canvasRef!.current!.height = height;
    }
  }, [width, height, canvasRef]);

  useEffect(() => {
    if (images) {
      if (progress < 1) {
        drawOneImage({
          image: images[1],
          canvas: canvasRef.current,
          width,
          height,
        });
      } else {
        console.log(progress);

        drawImage({
          image: images[progress],
          canvas: canvasRef.current,
          width,
          height,
        });
      }
    }
  }, [width, height, images, progress]);
  return (
    <div
      className={styles.player}
      ref={playerRef}
      style={{
        height: framesCount * speed,
      }}
    >
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.children}>{children}</div>
    </div>
  );
};
