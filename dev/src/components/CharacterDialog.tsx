import { CharacterName } from 'src/fixtures/characters'
import {
  aerithDialogLines,
  celsoDialogLines,
  DialogType,
  Dialogues,
  miraDialogLines,
  rugoDialogLines,
  saashDialogLines,
  theodorusDialogLines,
} from 'src/fixtures/dialog'
import { FC, useEffect, useState } from 'react'
import { UserIcon } from './UserIcon'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'
import {
  selectCharacter,
  selectFirstDialogueItem,
  shiftDialogueItem,
} from 'src/features/game'

export const randomItemFromArray = (items: string[]): string =>
  items[Math.floor(Math.random() * items.length)]

export type DialogHandler = (t: CharacterName) => string

const GenericLines: Dialogues = {
  [DialogType.Random]: ['Juuh elikkäs'],
  [DialogType.Ok]: ['Ok!'],
  [DialogType.Hello]: ['Hi there!'],
}

export const CharacterLines: Record<CharacterName, Partial<Dialogues>> = {
  Rugo: rugoDialogLines,
  Saash: saashDialogLines,
  Aerith: aerithDialogLines,
  Celso: celsoDialogLines,
  Theodorus: theodorusDialogLines,
  Mira: miraDialogLines,
}

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
  character?: CharacterName
}

const messageDelayTime = 5000
const charDelayTime = 20

export const CharacterDialog: FC<CharacterDialog> = ({}) => {
  const character = useAppSelector(selectCharacter)
  const dispatch = useAppDispatch()
  const { line: nextLine } = useAppSelector(selectFirstDialogueItem) ?? {}
  const [line, setLine] = useState('...')
  const [charIndex, setcharIndex] = useState(0)
  const [delayNext, setDelayNext] = useState(false)
  useEffect(() => {
    if (nextLine) {
      setDelayNext(true)
      const timer = setTimeout(() => setDelayNext(false), messageDelayTime)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [nextLine, delayNext])
  useEffect(() => {
    if (nextLine && delayNext === false) {
      setLine(nextLine)
      setcharIndex(0)
    }
  }, [delayNext])
  useEffect(() => {
    if (nextLine) {
      dispatch(shiftDialogueItem())
    }
  }, [delayNext])
  useEffect(() => {
    const value = charIndex + 1
    if (line && charIndex < line.length) {
      const timer = setTimeout(() => setcharIndex(value), charDelayTime) // TODO: make user config
      return () => {
        clearTimeout(timer)
      }
    }
  }, [charIndex])
  const subString = line?.slice(0, charIndex)

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
