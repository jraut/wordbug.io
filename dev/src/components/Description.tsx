import React from "react";

type HeaderLevel = 1 | 2 | 3 | 4 | 5;
interface Description {
  header?: string;
  content: string | string[];
  level?: HeaderLevel;
}

const Header: React.FC<{ level: HeaderLevel }> = ({ level, children }) => {
  const headerLevels: Record<
    HeaderLevel,
    React.ReactHTMLElement<HTMLHeadingElement>
  > = {
    1: React.createElement(
      'h1',
      { className: 'text-xl font-large text-black p-2 m:p-5 mx-auto' },
      children,
    ),
    2: React.createElement(
      'h2',
      { className: 'text-lg font-large p-2 m:p-3 mx-auto' },
      children,
    ),
    3: React.createElement('h3', { className: '' }, children),
    4: React.createElement('h4', { className: '' }, children),
    5: React.createElement('h5', { className: '' }, children),
  }
  return headerLevels[level]
}

export const Description: React.FC<Description> = ({
  content,
  header,
  level = 2,
}) => {
  const textParagraphClass = 'max-w-sm mx-auto p-4'
  return (
    <div className="p-10">
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
