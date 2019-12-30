
export interface Position {
  x: number;
  y: number;
}

export function fieldToString(field: Position): string {
  return `${field.x}:${field.y}`;
}

export function calcBlockMap(blocks: Position[]): { [key: string]: boolean } {
  const map: { [key: string]: boolean } = {};

  for (const block of blocks) {
    map[fieldToString(block)] = true;
  }

  return map;
}


export function calcShortestPath(tableSize: { width: number, height: number }, blockMap: { [key: string]: boolean }, start?: Position, end?: Position): Position[] | null | undefined {
  if (!start || !end) {
    return undefined;
  }

  const dirs = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 }
  ];

  const visited: { [key: string]: boolean } = {};
  visited[fieldToString(start)] = true;
  const prev: { [key: string]: Position } = {};
  const queue = [start];

  while (queue.length && !visited[fieldToString(end)]) {
    const field = queue.shift()!;

    for (const dir of dirs) {
      const newField = { x: field.x + dir.x, y: field.y + dir.y };
      if (newField.x >= 0 && newField.x < tableSize.width && newField.y >=0 && newField.y < tableSize.height && !blockMap[fieldToString(newField)] && !visited[fieldToString(newField)]) {
        prev[fieldToString(newField)] = field;
        visited[fieldToString(newField)] = true;
        queue.push(newField);
      }
    }
  }

  if (visited[fieldToString(end)]) {
    let f = end;
    const p = [];
    do {
      p.push(f);
      f = prev[fieldToString(f)];
    } while (f);

    return p.reverse();
  } else {
    return null;
  }
}
