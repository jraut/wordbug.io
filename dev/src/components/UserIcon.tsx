import { FC } from 'react'
import { CharacterName } from '../fixtures/characters'

const characterImageURLs: Partial<Record<CharacterName, string>> = {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserIcon {
  character: CharacterName
}

export const UserIcon: FC<UserIcon> = ({ character }) => {
  if (character in characterImageURLs) {
    return <img src={characterImageURLs[character]} />
  } else {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#54595d">
          <path d="M 10 11 C 4.08 11 2 14 2 16 L 2 19 L 18 19 L 18 16 C 18 14 15.92 11 10 11 Z" />
          <circle cx="10" cy="5.5" r="4.5" />
        </g>
      </svg>
    )
  }
}
