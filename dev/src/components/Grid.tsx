import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Grid {
  characters: string[]
  width: number
  height: number
}
const easings = ['ease-linear', 'ease-in', 'ease-out', 'ease-in-out']
const delays = [
  'delay-75',
  'delay-100',
  'delay-150',
  'delay-200',
  'delay-300',
  'delay-500',
  'delay-700',
  'delay-1000',
]
const nEasings = easings.length
const nDelays = delays.length
export const Grid: FC<Grid> = ({ characters, width, height }) => {
  const nx = Math.ceil(Math.sqrt((characters.length * width) / height))
  let ny = Math.ceil(Math.sqrt((characters.length * height) / width))
  if (nx * (ny - 1) > characters.length) {
    ny = ny - 1
  }
  const blockDimension = Math.min(width / nx, height / ny)
  return (
    <div
      className="flex flex-wrap relative inset-o mx-auto"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {characters.map((char, i) => {
        const easing = easings[i % nEasings]
        const delay = delays[i % nDelays]

        return (
          <div
            key={i}
            className={`flex p-1 absolute transition-all duration-700 ${easing} ${delay}`}
            style={{
              width: `${blockDimension}px`,
              height: `${blockDimension}px`,
              top:
                blockDimension *
                Math.floor(i / Math.ceil(characters.length / ny)),
              left: blockDimension * (i % nx),
            }}
          >
            <div className="flex m-auto w-full h-full bg-gray-300">
              <span className="m-auto">{char}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
