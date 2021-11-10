import { FC } from "react"

interface Palette {
  main: string
  secondaries: string[]
}

export const Palette: FC<Palette> = ({ main, secondaries }) => {
  return (
    <div className="flex-col">
      <div style={{ background: main }} className="p-1 mb-1">
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
