import { FC, useEffect, useState } from 'react'
import { CharacterName } from '../fixtures/characters'
import { UserIcon } from './UserIcon'

// Helper
const StringIsNumber = (value: string): boolean =>
  isNaN(Number(value)) === false

// Turn enum into array of numbers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const enumToArray = (enumme: Record<number | string, any>): string[] => {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map((key) => enumme[key])
}

export enum CharacterLineType {
  Random = 'Random',
  Ok = 'Ok',
  Hello = 'Hello',
}

export const characterLineTypes = enumToArray(CharacterLineType) // TODO: Use slice

export type CharacterLineHandler = (t: CharacterName) => string

export const CharacterLines: Record<
  CharacterName,
  Partial<Record<CharacterLineType, string>>
> = {
  Rugo: {
    Random: 'Hip hei',
  },
  Saash: {
    Random: 'Hip hei! My name is Saash!',
  },
  Aerith: {
    Random: 'Hip hei! My name is Aerith!',
  },
  Celso: {
    Random: 'Hip hei! My name is Celso!',
  },
  Theodorus: {
    Random: 'Hip hei! My name is Theodorus!',
  },
  Mira: {
    Random: 'Hip hei! My name is Mira!',
  },
  'Mystery-1': {
    Random: 'Hip hei! My name is Mystery!',
  },
  'Mystery-2': {
    Random: 'Hip hei! My name is Mystery!',
  },
}

export const DialogLines: Record<CharacterLineType, CharacterLineHandler> = {
  Random: (T) => CharacterLines[T]?.['Random'] ?? 'Random',
  Ok: (T) => CharacterLines[T]?.['Ok'] ?? 'All right!',
  Hello: (T) => CharacterLines[T]?.['Hello'] ?? 'Hello!',
}

export const dialogLine = (
  character: CharacterName,
  linetype: CharacterLineType,
): string => DialogLines[linetype](character)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CharacterDialog {
  character: CharacterName
  lineType: CharacterLineType
}

export const CharacterDialog: FC<CharacterDialog> = ({
  character,
  lineType,
}) => {
  const line = dialogLine(character, lineType)
  const [charIndex, setcharIndex] = useState(0)

  useEffect(() => {
    const value = charIndex + 1
    if (charIndex < line.length) {
      const timer = setTimeout(() => setcharIndex(value), 20) // TODO: make user config
      return () => {
        clearTimeout(timer)
      }
    }
  }, [charIndex])

  const subString = line.slice(0, charIndex)

  return (
    <div className="h-60">
      <div className="flex w-8/12 m-auto h-full">
        <div className="w-1/3 overflow-hidden flex">
          <div className="m-auto h-full">
            <UserIcon character={character} />
          </div>
        </div>
        <div className="w-2/3 line-clamp-3 prose prose-2xl text-left p-4">
          {subString}
        </div>
      </div>
    </div>
  )
}
