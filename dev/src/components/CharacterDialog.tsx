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
  addDialogueItem,
  selectCharacter,
  selectFirstDialogueItem,
  shiftDialogueItem,
} from 'src/features/game'

export const randomItemFromArray = (items: string[]): string =>
  items[Math.floor(Math.random() * items.length)]

export type DialogHandler = (t: CharacterName) => string

const GenericLines: Dialogues = {
  [DialogType.Random]: ['I might go out to watch the stars later.'],
  [DialogType.Ok]: ['Ok!'],
  [DialogType.Hello]: ['Hi there!'],
  [DialogType.Waiting]: ['I am waiting...'],
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
    [DialogType.Waiting]: () => '',
  },
)

export interface CharacterDialog {
  character?: CharacterName
}

const messageDelayTime = 2000
const idleMessageDelay = 5000
const charDelayTime = 20
const idleFrustationTreshold = 5
// const idleSeed = 1

// const idleLineRandom = new Prando(idleSeed)

export const CharacterDialog: FC<CharacterDialog> = ({}) => {
  const character = useAppSelector(selectCharacter)
  const dispatch = useAppDispatch()
  const { line: nextLine } = useAppSelector(selectFirstDialogueItem) ?? {}
  const [line, setLine] = useState('...')
  const [charIndex, setcharIndex] = useState(0)
  const [delayNext, setDelayNext] = useState(false)
  const [frustrationLevel, setFrustrationLevel] = useState(0)
  // Timer for delaying the next message when nextLine changes
  useEffect(() => {
    if (nextLine) {
      setDelayNext(true)
      const timer = setTimeout(() => setDelayNext(false), messageDelayTime)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [nextLine])

  // Pick next line if one is available when delay ends
  useEffect(() => {
    if (nextLine && delayNext === false && line !== nextLine) {
      setLine(nextLine)
      setcharIndex(0)
    }
  }, [delayNext])

  // Call for another one
  useEffect(() => {
    if (nextLine && delayNext === false) {
      dispatch(shiftDialogueItem())
    }
  }, [delayNext])

  // Advance character-roll-in index
  useEffect(() => {
    const value = charIndex + 1
    if (line && charIndex < line.length) {
      const timer = setTimeout(() => setcharIndex(value), charDelayTime) // TODO: make user config
      return () => {
        clearTimeout(timer)
      }
    }
  }, [charIndex])

  // Start idle timer if no next line pending
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (!nextLine) {
      timer = setTimeout(() => {
        if (frustrationLevel < idleFrustationTreshold) {
          const line = dialogLines[DialogType.Random](character)
          dispatch(
            addDialogueItem({
              line,
              type: DialogType.Random,
            }),
          )
        } else {
          const line = dialogLines[DialogType.Waiting](character)
          dispatch(
            addDialogueItem({
              line,
              type: DialogType.Waiting,
            }),
          )
        }
        setFrustrationLevel((level) => level + 1)
      }, idleMessageDelay) // TODO: make user config
      return () => {
        if (timer) clearTimeout(timer)
      }
    } else {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [nextLine])

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
