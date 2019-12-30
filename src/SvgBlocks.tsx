import React from 'react';
import { Position, fieldToString } from './util';

interface SvgBlocksProps {
  blocks: Position[];
  fieldSize: number;
}

export const SvgBlocks: React.FC<SvgBlocksProps> = ({ blocks, fieldSize }) => {
  return (
    <>
      {blocks.map(block => (
        <rect
          key={fieldToString(block)}
          className="block"
          x={block.x * fieldSize}
          y={block.y * fieldSize}
          width={fieldSize}
          height={fieldSize}
          stroke="#000"
          strokeWidth="1"
          fill="url(#diagonalHatch)"
        />
      ))}
    </>
  )
};