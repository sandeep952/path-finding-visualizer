export function bfs(start, dest, grid, rows, cols) {
  // list to store the sequence of visited nodes
  let visitedNodes = [];
  let visited = [];
  let queue = [];
  let prev = [];
  const directions = [
    [0, 1], //up
    [1, 0], //right
    [0, -1], //down
    [-1, 0], //left
  ];

  for (let row = 0; row < rows; row++) {
    let visRow = [];
    let prevRow = [];
    for (let col = 0; col < cols; col++) {
      visRow.push(false);
      prevRow.push(null);
    }
    visited.push(visRow);
    prev.push(prevRow);
  }

  queue.push(start);
  visited[start.row][start.col] = true;

  let distance = 0;
  let destinationFound = false;
  while (queue.length !== 0 && !destinationFound) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let currNode = queue.shift();
      let currX = currNode.row;
      let currY = currNode.col;

      visitedNodes.push(currNode);

      for (let k = 0; k < directions.length; k++) {
        let direction = directions[k];
        let nextX = currX + direction[0];
        let nextY = currY + direction[1];

        if (
          nextX >= 0 &&
          nextX < rows &&
          nextY >= 0 &&
          nextY < cols &&
          !visited[nextX][nextY]
        ) {
          if(grid[nextX][nextY].isWall)
          continue
          if (nextX === dest.row && nextY === dest.col) {
            prev[nextX][nextY] = currNode;
            destinationFound = true;
            break;
          }

          queue.push(grid[nextX][nextY]);
          prev[nextX][nextY] = currNode;
          visited[nextX][nextY] = true;
        }
      }
    }
    distance++;
  }
  let path = traceBackPath(grid, prev, dest);
  if(!path[0].isStart){
    distance = -1;
  }
  return {
    visitedNodes,
    path,
    distance,
  };
}

export function traceBackPath(grid, prev, destNode) {
  let path = [];
  let currNode = grid[destNode.row][destNode.col];
  while (currNode != null) {
    path.push(currNode);
    currNode = prev[currNode.row][currNode.col];
  }
  path.reverse();
  return path;
}
