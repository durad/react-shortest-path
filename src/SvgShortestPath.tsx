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

function lerp(p1: Position, p2: Position, f: number): Position {
  return {
    x: (1 - f) * p1.x + f * p2.x,
    y: (1 - f) * p1.y + f * p2.y
  };
}

export const SvgShortestPath: React.FC<SvgShortestPathProps> = ({ tableSize, blockMap, fieldSize, lineWidth, start, end }) => {
  const p = useMemo(() => calcShortestPath(tableSize, blockMap, start, end), [tableSize, blockMap, start, end]);
  const scrOffset = fieldSize / 2 + lineWidth / 2;

  const scr = (q: Position) => {
    return `${q.x * fieldSize + scrOffset} ${q.y * fieldSize + scrOffset}`;
  }

  if (p) {
    const d = [`M ${scr(p[0])}`];

    for (let i = 1; i < p.length - 1; i++) {
      const A = lerp(p[i - 1], p[i], 0.8);
      const B = lerp(p[i], p[i + 1], 0.2);
      d.push(`L ${scr(A)}`);
      d.push(`Q ${scr(p[i])} ${scr(B)}`);
    }

    d.push(`L ${scr(p[p.length - 1])}`);

    // const d = p.map((p, i) => `
    //   ${i === 0 ? 'M' : 'L'}
    //   ${p.x * fieldSize + fieldSize / 2 + lineWidth / 2} ${p.y * fieldSize + fieldSize / 2 + lineWidth / 2}
    // `);

    return (
      <path d={d.join(' ')} fill="none" stroke="#000" />
    );
  } else {
    return (<></>);
  }
};
