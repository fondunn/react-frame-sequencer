export interface IPreloadImages {
  [key: number]: HTMLImageElement
}

export const preloadImages = async (sequencesNumber: number, path: string, prefix: string, fileType: string) => {
  const preloadedImages: IPreloadImages = {}

  for (let i = 1; i <= sequencesNumber; i++) {
    preloadImageX(i, path, prefix, fileType).then((res) => (preloadedImages[i] = res))
  }
  return preloadedImages
}

async function preloadImageX(frame: number, path: string, prefix: string, fileType: string) {
  const image = document.createElement('img')
  image.src = `/${path}/${prefix}${String(frame).padStart(4, '0')}.${fileType}`
  return image
}
