import { CharacterName } from 'src/fixtures/characters'
import { rugoDialogLines } from 'src/fixtures/dialog'
import { FC, useEffect, useState } from 'react'
import { UserIcon } from './UserIcon'

export enum DialogType {
  Random = 'Random',
  Ok = 'Ok',
  Hello = 'Hello',
}

export type DialogHandler = (t: CharacterName) => string

const GenericLines: Record<DialogType, string[]> = {
  [DialogType.Random]: ['Juuh elikkäs'],
  [DialogType.Ok]: ['Ok!'],
  [DialogType.Hello]: ['Hi there!'],
}

export const CharacterLines: Record<
  CharacterName,
  Partial<Record<DialogType, string[]>>
> = {
  Rugo: {
    Random: [
      "I'll find a way to save us all.",
      'My friends are here for me.',
      "I'll fight for a new future.",
      "I'm trying to save everyone.",
      "We're not gonna give up.",
      'This world needs a hero.',
      "I will fight for the world's future.",
      "There's a lot of people counting on me.",
      "I'll be a hero to everyone.",
      "I'm fighting for the sake of the world.",
      "I won't let my friends down.",
      "We'll find a way to save everyone.",
      'My friends are here for me.',
    ],
  },
  Saash: {
    Random: ['Hip hei! My name is Saash!'],
  },
  Aerith: {
    Random: ['Hip hei! My name is Aerith!'],
  },
  Celso: {
    Random: ['Hip hei! My name is Celso!'],
  },
  Theodorus: {
    Random: ['Hip hei! My name is Theodorus!'],
  },
  Mira: {
    Random: ['Hip hei! My name is Mira!'],
  },
  'Mystery-1': {
    Random: ['Hip hei! My name is Mystery!'],
  },
  'Mystery-2': {
    Random: ['Hip hei! My name is Mystery!'],
  },
}

const randomItemFromArray = (items: string[]): string =>
  items[Math.floor(Math.random() * items.length)]

// Build dialog line handlers
export const dialogLines = Object.keys(DialogType).reduce<
  Record<DialogType, DialogHandler>
>(
  (memo, dialogLineType) => {
    return {
      ...memo,
      [dialogLineType]: (char: CharacterName) => {
        const lines =
          CharacterLines?.[char]?.[dialogLineType as DialogType] ??
          GenericLines[dialogLineType as DialogType]
        return randomItemFromArray(lines)
      },
    }
  },
  {
    [DialogType.Random]: () => '',
    [DialogType.Ok]: () => '',
    [DialogType.Hello]: () => '',
  },
)

export interface CharacterDialog {
  character: CharacterName
  lineType: DialogType
}

export const CharacterDialog: FC<CharacterDialog> = ({
  character,
  lineType,
}) => {
  const line = dialogLines[lineType](character)
  const [charIndex, setcharIndex] = useState(0)
  console.log(line) // TODO: Should not refresh constantly, get from state
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
