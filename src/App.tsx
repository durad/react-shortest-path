import React, { useState, useMemo } from 'react';
import { orderBy } from 'lodash-es';
import { useBoardMouse } from './use-board-mouse';
import { Position, fieldToString, calcBlockMap } from './util';
import { SvgHighlight } from './SvgHighlight';
import { SvgBlocks } from './SvgBlocks';
import { SvgShortestPath } from './SvgShortestPath';
import { SvgLocationIcon } from './SvgLocationIcon';
import { SvgBoardLines } from './SvgBoardLines';
import { AppMenu } from './AppMenu';
import './App.scss';

export enum AppMode {
  DEFAULT,
  SET_BLOCK,
  REMOVE_BLOCK,
  SET_START,
  SET_END,
}

interface AppProps {
  tableSize: { width: number, height: number };
  fieldSize?: number;
  lineWidth?: number;
}

const App: React.FC<AppProps> = (props) => {
  const { tableSize } = props;
  const fieldSize = props.fieldSize ?? 30;
  const lineWidth = props.lineWidth ?? 1;
  const svgSize = { width: tableSize.width * fieldSize, height: tableSize.height * fieldSize };

  const [appMode, setAppMode] = useState<AppMode>(AppMode.SET_BLOCK);
  const [blocks, setBlocks] = useState<Position[]>([]);
  const [start, setStart] = useState<Position>();
  const [end, setEnd] = useState<Position>();
  const blockMap = useMemo(() => calcBlockMap(blocks), [blocks]);
  const boardLines = useMemo(() => <SvgBoardLines {...{ tableSize, fieldSize, lineWidth }} />, [tableSize, fieldSize, lineWidth]);

  const [bind, hoveredField] = useBoardMouse(() => {
    switch (appMode) {
      case AppMode.SET_BLOCK:
        if (hoveredField && !blockMap[fieldToString(hoveredField)]) {
          const newBlocks = orderBy([...blocks, hoveredField], ['x', 'y']);
          setBlocks(newBlocks);
        }
        break;
      case AppMode.REMOVE_BLOCK:
        if (hoveredField && blockMap[fieldToString(hoveredField)]) {
          const newBlocks = blocks.filter(b => b.x !== hoveredField.x || b.y !== hoveredField.y);
          setBlocks(newBlocks);
        }
        break;
      case AppMode.SET_START:
        if (hoveredField && !blockMap[fieldToString(hoveredField)]) {
          setStart(hoveredField);
        }
        break;
      case AppMode.SET_END:
        if (hoveredField && !blockMap[fieldToString(hoveredField)]) {
          setEnd(hoveredField);
        }
        break;
    }
  }, tableSize, fieldSize, lineWidth);

  const svgHighlight = hoveredField && <SvgHighlight {...{hoveredField, fieldSize, lineWidth}} />;
  const svgBlocks = useMemo(() => (<SvgBlocks {...{blocks, fieldSize}} />), [blocks, fieldSize]);
  const svgShortestPath = <SvgShortestPath {...{ tableSize, blockMap, fieldSize, lineWidth, start, end }} />;
  const svgStart = start && <SvgLocationIcon pos={start} fieldSize={fieldSize} color="#153" />;
  const svgEnd = end && <SvgLocationIcon pos={end} fieldSize={fieldSize} color="#315" />;

  return (
    <div className="app-component">
      <div className="app-menu-container">
        <AppMenu appMode={appMode} onSelect={mode => setAppMode(mode)} />
      </div>
      <div className="app-content">
        <svg
          {...bind}
          className="board"
          viewBox={`${-lineWidth / 2} ${-lineWidth / 2} ${svgSize.width + lineWidth} ${svgSize.height + lineWidth}`}
          style={{ width: svgSize.width, height: svgSize.height }}
        >
          <defs>
            <pattern
              id="diagonalHatch"
              patternUnits="userSpaceOnUse"
              width="4"
              height="4"
              patternTransform="rotate(-45 0 0)"
            >
              <path d="M -1,2 l 6,0" stroke="#941" strokeWidth="1"/>
            </pattern>
          </defs>
          {boardLines}
          {svgBlocks}
          {svgStart}
          {svgEnd}
          {svgShortestPath}
          {svgHighlight}
        </svg>
      </div>
    </div>
  );
}

export default App;
