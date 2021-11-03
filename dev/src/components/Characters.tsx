import React from 'react'
import { CHARACTER_DATA } from '../fixtures/characters'

export interface Character {
    name: string
    description: string[]
}
export const Characters: React.FC<Character> = () => {
    const characters = CHARACTER_DATA
    return (<div><h1>Characters</h1>
        {characters.map(char => {
            return <div>
                <h2>
                    {char.name}
                </h2>
                <p>
                    {char.description.map(d => <p style={{ textAlign: "left", maxWidth: '18em', margin: 'auto', paddingBottom: '1em' }}> {d}</p>)}
            </p>
            </div>
        })}
    </div >)
}