import React, { useState, useEffect } from 'react';
import { Position } from './util';

export function useBoardMouse(
  fn: () => void,
  tableSize: { width: number, height: number },
  fieldSize: number,
  lineWidth: number
): [any, Position | undefined, boolean] {
  const [down, setDown] = useState(false);
  const [field, setField] = useState<Position>();

  const fieldX = field?.x;
  const fieldY = field?.y;

  useEffect(() => {
    if (fieldX !== undefined && down) {
      fn();
    }
  }, [fn, fieldX, fieldY, down]);

  return [
    {
      onMouseDown: () => {
        setDown(true);
      },
      onMouseMove: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const x = Math.floor((e.nativeEvent.offsetX - lineWidth / 2) / fieldSize);
        const y = Math.floor((e.nativeEvent.offsetY - lineWidth / 2) / fieldSize);

        if (x >= 0 && x < tableSize.width && y >= 0 && y < tableSize.height) {
          setField({ x, y });
        } else {
          setField(undefined);
        }
      },
      onMouseUp: () => {
        setDown(false);
      },
      onMouseLeave: () => {
        setDown(false);
        setField(undefined);
      }
    },
    field,
    down
  ];
}
