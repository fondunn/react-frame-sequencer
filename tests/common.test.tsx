import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import FrameSequencer from '../src/components/FrameSequencer/FrameSequencer'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<FrameSequencer framesCount={100} imagesPath='frames' imagesType='jpg' imagesPrefix='thumb' />)
  })
})
