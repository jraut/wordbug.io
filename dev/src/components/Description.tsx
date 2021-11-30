import { FC, createElement, ReactHTMLElement } from 'react'

type HeaderLevel = 1 | 2 | 3 | 4 | 5
interface Description {
  header?: string
  content: string | string[]
  level?: HeaderLevel
}

export const h1style = 'text-xl font-large text-black p-2 m:p-5 mx-auto'
export const h2style = 'text-lg font-large p-2 m:p-3 mx-auto'

const Header: FC<{ level: HeaderLevel }> = ({ level, children }) => {
  const headerLevels: Record<
    HeaderLevel,
    ReactHTMLElement<HTMLHeadingElement>
  > = {
    1: createElement('h1', { className: h1style }, children),
    2: createElement('h2', { className: h2style }, children),
    3: createElement('h3', { className: '' }, children),
    4: createElement('h4', { className: '' }, children),
    5: createElement('h5', { className: '' }, children),
  }
  return headerLevels[level]
}

export const Description: FC<Description> = ({
  content,
  header,
  level = 2,
}) => {
  const textParagraphClass = 'max-w-sm mx-auto p-4'
  return (
    <div className="m-auto prose">
      {header ? <Header level={level}>{header}</Header> : undefined}
      {typeof content === 'string' ? (
        <p className={textParagraphClass}>{content}</p>
      ) : (
        <div>
          {' '}
          {content.map((s, i) => (
            <p key={i} className={textParagraphClass}>
              {s}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
