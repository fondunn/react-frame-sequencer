# React Frame Sequencer

## Frames sequencer player for changing frames when user scrolls <br /><br />

## Usage

```
import { FrameSequencer } from "react-frame-sequencer";

const App = () => {
    return (
        <FrameSequencer
            framesCount={100}
            imagesPath='frames'
            imagesType='jpg'
            imagesPrefix='thumb'
            speed={20}
        >
            <h1>Hello World!</h1>
        </FrameSequencer>
    )
}
```

## Props

```
framesCount   - number of frames
imagesPath    - path to images folder
imagesType    - type of images
imagesPrefix  - (optional) - prefix in the images names
speed         - (optional) - speed of the frames updates (default 10)
```

## Important!

<pre>
In this version 0.1.0
All images names must start with a 0001 
Example: thumb0001.jpg
And no void frames are allowed, if you want to use 300 frames, first frame must be named 0001 and last 0301
</pre>
