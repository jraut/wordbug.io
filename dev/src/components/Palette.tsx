import React from 'react'

interface Palette {
  main: string
  secondaries: string[]
}

export const Palette: React.FC<Palette> = ({ main, secondaries }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: main, padding: '1em', marginBottom: '0.25em' }}>
        {main}&nbsp;
      </div>
      {secondaries.map((secColorHex) => (
        <div style={{ background: secColorHex }} key={secColorHex}>
          {secColorHex} &nbsp;
        </div>
      ))}
    </div>
  )
}
