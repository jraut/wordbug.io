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
    1: React.createElement("h1", {}, children),
    2: React.createElement("h2", {}, children),
    3: React.createElement("h3", {}, children),
    4: React.createElement("h4", {}, children),
    5: React.createElement("h5", {}, children),
  };
  return headerLevels[level];
};

export const Description: React.FC<Description> = ({
  content,
  header,
  level = 2,
}) => {
  return (
    <>
      {header ? <Header level={level}>{header}</Header> : undefined}
      {typeof content === "string" ? (
        <p>{content}</p>
      ) : (
        <div>
          {" "}
          {content.map((s, i) => (
            <p key={i}>{s}</p>
          ))}
        </div>
      )}
    </>
  );
};
