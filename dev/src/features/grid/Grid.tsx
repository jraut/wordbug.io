import { FC } from 'react'
import { useAppSelector } from 'src/hooks/store'
import { Pointer } from './Pointer'
import { Square } from './Square'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Grid {
  width: number
  height: number
  blockSize: number //  length of a blocks side in pixels
}
export const Grid: FC<Grid> = ({ width, height, blockSize }) => {
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
          return (
            <Square
              key={i}
              id={String(i)}
              dimension={blockSize}
              char={char}
            ></Square>
          )
        })}
      </div>
    </>
  )
}
