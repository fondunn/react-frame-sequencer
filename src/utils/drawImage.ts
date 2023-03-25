export interface IDrawer {
  image: HTMLImageElement
  canvas: HTMLCanvasElement | null
  width: number
  height: number
}

export interface IDrawImage extends IDrawer {
  firstLoad?: boolean
}
export const drawImage = ({ image, canvas, width, height }: IDrawImage) => {
  if (image) {
    drawer({ image, canvas, width, height })
  }
}
export const drawOneImage = ({ image, canvas, width, height }: IDrawImage) => {
  if (image) {
    image.onload = () => drawer({ image, canvas, width, height })
  }
}

const drawer = ({ image, canvas, width, height }: IDrawer) => {
  try {
    canvas!.width = width
    canvas!.height = height
    const ctx = canvas!.getContext('2d')
    const yDiff = image?.height - canvas!.height
    const customRatio = 60
    if (canvas!.width > canvas!.height) {
      if (height < 480) {
        ctx?.drawImage(image, 0, 0, image.width - canvas!.width - customRatio * 4.5, canvas!.height)
      } else {
        ctx?.drawImage(image, (canvas!.width - width) / 2, (canvas!.height - height) / 2, width, height)
      }
    } else {
      ctx?.drawImage(
        image,
        (canvas!.width - (image.width - yDiff)) / 2,
        -customRatio,
        image.width - yDiff,
        canvas!.height + customRatio,
      )
    }
  } catch (e) {
    console.error(e)
  }
}
