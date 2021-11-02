import React from 'react'
import { CHARACTER_DATA } from '../fixtures/characters'

export interface Character {
    name: string
    description: string
}
export const Characters: React.FC<{}> = () => {
    const characters = CHARACTER_DATA
    return (<div><h1>Characters</h1>
    {characters.map(char => {
        return <div>
            <h2>
                { char.name }
            </h2>
            <p>
                { char.description }  
            </p>
        </div>
    })}
</div>)
    }