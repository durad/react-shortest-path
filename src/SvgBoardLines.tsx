import React from 'react';

interface SvgBoardLinesProps {
  tableSize: { width: number, height: number };
  fieldSize: number;
  lineWidth: number;
}

export const SvgBoardLines: React.FC<SvgBoardLinesProps> = ({ tableSize, fieldSize, lineWidth }) => {
  const svgSize = { width: tableSize.width * fieldSize, height: tableSize.height * fieldSize };
  const lines = [];

  for (let y = 0; y <= tableSize.height; y++) {
    lines.push(`M ${-lineWidth / 2} ${y * fieldSize} L ${svgSize.width + lineWidth} ${y * fieldSize}`);
  }

  for (let x = 0; x <= tableSize.width; x++) {
    lines.push(`M ${x * fieldSize} ${-lineWidth / 2} L ${x * fieldSize} ${svgSize.height + lineWidth}`);
  }

  return (
    <path className="lines" d={lines.join(' ')} strokeWidth={lineWidth}/>
  );
}
