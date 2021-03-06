import { FC } from 'react'
import { useAppSelector } from 'src/hooks/store'
import { Pointer } from './Pointer'
import { Square } from './Square'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Grid {
  width: number
  height: number
  checkedIds: number[]
  blockSize: number //  length of a blocks side in pixels
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
export const Grid: FC<Grid> = ({ width, height, checkedIds, blockSize }) => {
  const characters = useAppSelector((store) => store.grid.characters)
  return (
    <>
      <div
        className="relative flex flex-wrap mx-auto duration-700 ease-in-out overscroll-none inset-o transition-area"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          // marginTop: `${(window.innerHeight - height) / 2}px`,
        }}
      >
        <Pointer />
        {characters.map((char, i) => {
          const easing = easings[i % nEasings]
          const delay = delays[(i * Math.random()) % nDelays]
          const checked = checkedIds.includes(i)

          return (
            <Square
              key={i}
              id={String(i)}
              dimension={blockSize}
              char={char}
              easing={easing}
              delay={delay}
              checked={checked}
            ></Square>
          )
        })}
      </div>
    </>
  )
}
