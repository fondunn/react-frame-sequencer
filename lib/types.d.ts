export interface IImages {
  [key: number]: HTMLImageElement;
}

export interface ISequencePlayer {
  framesCount: number;
  imagesPath: string;
  imagesPrefix?: string;
  imagesType: string;
  speed?: number;
  children?: JSX.Element;
}

export interface IWindowSize {
  width: number;
  height: number;
}

export interface IDrawer {
  image: HTMLImageElement;
  canvas: HTMLCanvasElement | null;
  width: number;
  height: number;
}

export interface IDrawImage extends IDrawer {
  firstLoad?: boolean;
}

export interface IPreloadImages {
  [key: number]: HTMLImageElement;
}
