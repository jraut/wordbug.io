import { FC, useEffect, useRef, useState } from 'react'
import {
  addDialogueItem,
  defaultCharacter,
  selectFirstDialogueItem,
  shiftDialogueItem,
} from 'src/features/game/store'
import { Character, CharacterName } from 'src/features/select-character/types'
import { CHARACTER_DATA } from 'src/fixtures/characters'
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
import { useAppDispatch, useAppSelector } from 'src/hooks/store'

export const randomItemFromArray = (items: string[]): string =>
  items[Math.floor(Math.random() * items.length)]

export type DialogHandler = (t: CharacterName) => string

const GenericLines: Dialogues = {
  [DialogType.Random]: ['I might go out to watch the stars later.'],
  [DialogType.Ok]: ['Ok!'],
  [DialogType.Hello]: ['Hi there!'],
  [DialogType.Frustrated]: ['I am waiting...'],
  [DialogType.Word]: [
    'I am sure that everyone in the room is happy with your results. Keep going and we will win!',
    "Almost there! Don't give up!",
    'Another one! We are getting close to the goal!',
    'Another word found! I think we are going to win soon!',
    'Congratulations, you found another word! I hope you are enjoying this game!',
    'Good job for finding another word! We are doing great!',
    'Good job for scoring a word! Keep going and we will win!',
    "Good job, but I think we can do better! Let's try harder!",
    'Good job, you got another word! Keep it up!',
    'Good, you got another word! You are really helpful!',
    'Great job! Keep it up and we will soon reach the goal!',
    'Hooray! You found another word! You are my hero!',
    'I admire your efforts! You are really good at this game!',
    'I think you are the only one who can win this round!',
    'I think you can do it! You are almost there!',
    "I'm impressed with your ability to find words! Keep it up!",
    'Nice job, another word found! I appreciate your skills!',
    "Nice work! Another word found! Let's keep going!",
    'Nicely done, you found another word! The round is soon over!',
    "That's it, another word found! You are really good at this game!",
    "That's it! Another word found! The round is getting close to the end!",
    'We are getting close to the goal! Keep going!',
    "Well done, that's another word found! You are doing great!",
    "Well done, you found another word! That's really great!",
    'Well done, you found another word! We are doing it! Keep going!',
    'Well done, you found another word! You are doing a great job!',
    'Well done, you found another word!',
    'Well played, you found another one! At this pace the round will be soon over!',
    "You are almost there! It's almost your turn!",
    'You are my favourite person in the world! Another word found!',
    'You are on a roll! Well done!',
    'You are really close to win this round! Well done!',
    'You are so close to the goal! Keep going!',
    "You found a full word! Nice work! I'm sure we will win soon!",
    'You got another word! This is fantastic!',
    'You got another word! You are doing great!',
    'You got points for finding a word! Well done! We are going go reach the goal soon!',
    'You made a lot of points! Well done! It is an honor to have you in our team!',
    'You made a lot of points! You are a great player! Everyone is proud of you!',
    "You're a master at finding words! Just a few more and we'll win the round!",
    "You've been so good at finding words, I'll soon have to find a gift for you.",
    'Your skill and efforts are very impressive! The goal is near!',
  ],
  [DialogType.WordFrustrated]: [
    "A word! A word! You found a word! Yay! You have got a point! The first point in a long time! Hooray! Let's go!",
    'Do you really think I care about points? Please... Go on... Keep trying... Until you get the next word... But you are too slow... Way too slow...',
    'Good job for scoring a word! Too bad it is ages since the last one. Great we got some points.',
    'I actually did not expect another word, at all really! Thanks for the points!',
    'I do not appreciate waiting but at least you found another word and gained a point!',
    'I waited for such a long time... But at least you got points for finding a word!',
    'Oh, really? You have scored a word? After such a long time? Congratulations! Too bad it probably will be ages for the next one!',
    'That was a long wait! But you did find a word. You should try a bit harder.',
    'Too bad it took so long. I have been waiting for such a long time for it. Well, at least you have points.',
    'Uhh... Really, did you find another one? Another word? It took so long! It was about time! Thanks for the points.',
    'What? You did not find a word? You were not even close to finding a word? Why are you wasting my time? Just go away...',
    'Finally! Another word! Too bad it took so long! But at least you got a point.',
    'I do not appreciate waiting so long for another word. But you got a point, so good job!',
    'This was a very long time, but at least you got a point.',
    'You finally found another word! Too bad it took so long.',
  ],
  [DialogType.NotAWord]: ['That is not a word!'],
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
    [DialogType.Frustrated]: () => '',
    [DialogType.Word]: () => '',
    [DialogType.WordFrustrated]: () => '',
    [DialogType.NotAWord]: () => '',
  },
)

export interface CharacterDialog {
  character?: Character
}

const messageDelayTime = 5000
const idleMessageDelay = 10000
const charDelayTime = 20
const idleFrustationTreshold = 10
// const idleSeed = 1

// const idleLineRandom = new Prando(idleSeed)

export const CharacterDialog: FC<CharacterDialog> = ({
  character = CHARACTER_DATA[defaultCharacter],
}) => {
  const dispatch = useAppDispatch()
  const textScrollerRef = useRef<HTMLDivElement>(null)
  const nextDialogItem = useAppSelector(selectFirstDialogueItem) ?? undefined
  const nextLine = nextDialogItem?.line
  const [line, setLine] = useState('...')
  const [charIndex, setcharIndex] = useState(0)
  const [delayNext, setDelayNext] = useState(false)
  const [idle, setIdle] = useState(false)
  const [frustrationLevel, setFrustrationLevel] = useState(0)
  // Timer for delaying the next message when nextLine changes
  useEffect(() => {
    if (nextLine) {
      setDelayNext(true)
      setIdle(false)
      const timer = setTimeout(() => setDelayNext(false), messageDelayTime)
      return () => {
        clearTimeout(timer)
      }
    } else {
      setIdle(true)
    }
  }, [nextLine])

  useEffect(() => {
    if (nextDialogItem) {
      if (nextDialogItem.type == DialogType.Word) {
        setFrustrationLevel(0)
        setLine(nextDialogItem.line)
        setcharIndex(0)
      } else if (nextDialogItem.type === DialogType.NotAWord) {
        setFrustrationLevel((level) => level + 3)
        setLine(nextDialogItem.line)
        setcharIndex(0)
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
      const timer = setTimeout(() => {
        setcharIndex(value)
        if (textScrollerRef.current) {
          textScrollerRef.current.scrollTop =
            textScrollerRef.current.scrollHeight
        }
      }, charDelayTime) // TODO: make user config
      return () => {
        clearTimeout(timer)
      }
    }
  }, [charIndex])

  // Start idle timer if no next line pending
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (idle) {
      timer = setTimeout(() => {
        if (frustrationLevel < idleFrustationTreshold) {
          const line = dialogLines[DialogType.Random](character.name)
          dispatch(
            addDialogueItem({
              line,
              type: DialogType.Random,
            }),
          )
        } else {
          const line = dialogLines[DialogType.Frustrated](character.name)
          dispatch(
            addDialogueItem({
              line,
              type: DialogType.Frustrated,
            }),
          )
        }
        setFrustrationLevel((level) => level + 1)
        setDelayNext(false)
      }, idleMessageDelay) // TODO: make user config
      return () => {
        if (timer) clearTimeout(timer)
      }
    } else {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [idle])

  const subString = line?.slice(0, charIndex)

  const borderPadding = 2
  const borders = 'border-2 border-gray-800 rounded-md'
  return (
    <div className="h-40 pointer-events-none md:h-52 md:mt-2">
      <div
        className={`flex items-stretch p-1 w-full h-full bg-white shadow-2xl md:p-${borderPadding} ${borders}`}
      >
        <div
          className={`overflow-hidden mr-1 w-1/3 md:mr-${borderPadding} ${borders}`}
        >
          <div className="h-full aspect-h-1 aspect-w-1">
            <div className="flex">
              <div
                className="w-full h-full m-auto"
                style={{ transform: 'scaleX(-1)' }}
              >
                <div
                  className="w-full h-full bg-center bg-cover rounded-sm"
                  style={{ backgroundImage: `url(${character.portrait})` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex w-full bg-gray-800 rounded-sm md:h-full md:px-4 ${borders}`}
        >
          <div
            ref={textScrollerRef}
            className="my-auto overflow-x-hidden overflow-y-scroll max-h-32 md:max-h-48"
          >
            <div className="font-mono prose-sm prose text-left text-gray-100 md:prose-2xl scrollbar scrollbar-none">
              {subString}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
