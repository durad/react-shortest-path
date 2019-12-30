import React, { useMemo } from 'react';
import { Position, calcShortestPath } from './util';

interface SvgShortestPathProps {
  tableSize: { width: number, height: number };
  blockMap: { [key: string]: boolean };
  fieldSize: number;
  lineWidth: number;
  start: Position | undefined;
  end: Position | undefined;
}

export const SvgShortestPath: React.FC<SvgShortestPathProps> = ({ tableSize, blockMap, fieldSize, lineWidth, start, end }) => {
  const shortestPath = useMemo(() => calcShortestPath(tableSize, blockMap, start, end), [tableSize, blockMap, start, end]);

  if (shortestPath) {
    const svgShortestPath = shortestPath.map((p, i) => `
      ${i === 0 ? 'M' : 'L'}
      ${p.x * fieldSize + fieldSize / 2 + lineWidth / 2} ${p.y * fieldSize + fieldSize / 2 + lineWidth / 2}
    `).join(' ');

    return (
      <path d={svgShortestPath} fill="none" stroke="#000" />
    );
  } else {
    return (<></>);
  }
};
