import React from 'react';
import { Position } from './util';

interface SvgLocationIconProps {
  pos: Position;
  fieldSize: number;
  color: string;
}

export const SvgLocationIcon: React.FC<SvgLocationIconProps> = ({ pos, fieldSize, color }) => {
  return (
    <g transform={`translate(${pos.x * fieldSize + 4}, ${pos.y * fieldSize + 3}) scale(0.15)`}>
      <path fill={color} d="M95.35,50.645c0,13.98-11.389,25.322-25.438,25.322c-14.051,0-25.438-11.342-25.438-25.322   c0-13.984,11.389-25.322,25.438-25.322C83.964,25.322,95.35,36.66,95.35,50.645 M121.743,50.645C121.743,22.674,98.966,0,70.866,0   C42.768,0,19.989,22.674,19.989,50.645c0,12.298,4.408,23.574,11.733,32.345l39.188,56.283l39.761-57.104   c1.428-1.779,2.736-3.654,3.916-5.625l0.402-0.574h-0.066C119.253,68.516,121.743,59.874,121.743,50.645"/>
    </g>
  );
};
