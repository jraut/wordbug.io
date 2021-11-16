import React, { FC, MutableRefObject, useRef, useState } from 'react'
import { Grid } from './Grid'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Draggable {
  parentRef: MutableRefObject<HTMLDivElement | null>
  onDrag: (t: Coordinates) => void
  initialPosition: number //
}

export interface Coordinates {
  x: number
  y: number
}
export const Draggable: FC<Draggable> = ({
  parentRef,
  onDrag,
  initialPosition,
}) => {
  // const [dragStart, setDragStart] = useState<Coordinates | undefined>()
  const [position, setPosition] = useState<number>(initialPosition)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    const { buttons, clientX, clientY } = e
    if (
      buttons === undefined ||
      (buttons === 0 && clientX !== 0 && clientY !== 0)
    ) {
      const {
        offsetTop: y,
        // offsetLeft: x,
        // clientWidth: width,
      } = e.currentTarget
      const { offsetLeft, clientWidth: width } = parentRef?.current ?? {
        offsetLeft: 0,
        clientWidth: 0,
      }
      let newPosition = clientX - offsetLeft
      newPosition = (newPosition - width) * 2 + width
      setPosition(newPosition)
      onDrag({
        x: newPosition,
        y,
      })
    }
  }

  return (
    <div
      draggable
      className="absolute"
      style={{ left: `${position}px`, top: '-1em' }}
      onDrag={handleDrag}
      onDragEnd={handleDrag}
    >
      dragme
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GameArea {}

export const GameArea: FC<GameArea> = () => {
  // TODO: initial width katsotaan containerRefistä
  const [width, setWidth] = useState(300)
  const containerRef = useRef<HTMLDivElement>(null)
  const resizeWidth = ({ x, y: _y }: Coordinates): void => {
    setWidth(x)
  }
  return (
    <div className="flex">
      <div ref={containerRef} className="relative mx-auto transition-spacing">
        <Draggable
          parentRef={containerRef}
          onDrag={resizeWidth}
          initialPosition={width}
        />
        <Grid
          characters={Array.from(Array(200)).map((_, i) => String(i % 10))}
          width={width}
          height={800}
        />
      </div>
    </div>
  )
}
