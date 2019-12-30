import React from 'react';
import { Position } from './util';

interface SvgHighlightProps {
  hoveredField: Position;
  fieldSize: number;
  lineWidth: number;
}

export const SvgHighlight: React.FC<SvgHighlightProps> = ({ hoveredField, fieldSize, lineWidth }) => {
  return (
    <rect
      className="highlight-rect"
      x={hoveredField.x * fieldSize}
      y={hoveredField.y * fieldSize}
      width={fieldSize}
      height={fieldSize}
      strokeWidth={lineWidth}
    />
  );
};