import { FC } from 'react'

import { Modifier, useDraggable } from '@dnd-kit/core'
import {
  getEventCoordinates,
  isTouchEvent,
  hasViewportRelativeCoordinates,
  CSS,
} from '@dnd-kit/utilities'

export const snapCenterToCursor: Modifier = ({
  activatorEvent,
  activeNodeRect,
  transform,
}) => {
  if (
    activeNodeRect &&
    activatorEvent &&
    (isTouchEvent(activatorEvent) ||
      hasViewportRelativeCoordinates(activatorEvent))
  ) {
    const activatorCoordinates = getEventCoordinates(activatorEvent)
    const { x, y } = activatorCoordinates
    const offsetX = x - activeNodeRect.left
    const offsetY = y - activeNodeRect.top

    return {
      ...transform,
      x: transform.x + offsetX - activeNodeRect.width / 2,
      y: transform.y + offsetY - activeNodeRect.height / 2,
      // x: offsetX + transform.x,
      // y: offsetY + transform.y,
    }
  }

  return transform
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Pointer {}

export const Pointer: FC<Pointer> = () => {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: 'grid-pointer',
    })
  const activeStyle = isDragging
    ? {
        // width: '4px',
        // height: '4px',
        // transform: `scale(${transform?.scaleX}, ${transform?.scaleY}) translate(${transform?.x}px, ${transform?.y}px)`,
      }
    : // ? { top:  }
      {}
  const transformStyle = { transform: CSS.Translate.toString(transform) }
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="absolute z-30 w-full h-full opacity-30"
      style={{
        ...transformStyle,
        ...activeStyle,
      }}
    >
      {' '}
    </div>
  )
}
