export const getBubblePositions = (windowState) => {
  const bubblePositions = [
    [
      {x: 200, y: 240, size: 240}, {x: 450, y: 180, size: 300}, {x: 730, y: 300, size: 280}, /* 2, 3, 4 */
      {x: 970, y: 240, size: 230}, {x: 330, y: 530, size: 280}, {x: 580, y: 600, size: 230}, /* 5, 6, 7 */
      {x: 850, y: 660, size: 270}, {x: 110, y: 750, size: 230}, {x: 380, y: 930, size: 300}, /* 8, 9, 10 */
      {x: 630, y: 870, size: 210}, {x: 900, y: 970, size: 250}, {x: 250, y: 1250, size: 250}, /* 11, 12, 13 */
      {x: 580, y: 1250, size: 280}, {x: 850, y: 1260, size: 200}, {x: 150, y: 1540, size: 230}, /* 14, 15, 16 */
      {x: 400, y: 1600, size: 270}, {x: 650, y: 1630, size: 250}, {x: 900, y: 1550, size: 300}, /* 17, 18, 19 */
      {x: 110, y: 1960, size: 230}, {x: 340, y: 1930, size: 250}, {x: 690, y: 1990, size: 270}, /* 20, 21, 22 */
      {x: 970, y: 1970, size: 270} /* 23 */
    ],
    []
  ];

  const variationX = 20, firstX = 70, secondX = 210;
  const variationSize = 50, minSize = 110;
  const yDist = 200;
  let counter = 0;
  for (let i = 0; i < 29; ++i) {
    if (i % 2 == 0) ++counter;
    let randomX = Math.floor(Math.random() * variationX);
    if (i % 2 == 0) randomX += firstX;
    else randomX += secondX;

    let yPos = counter * yDist;
    if (i % 2 == 1) yPos += (yDist / 2);

    let randomSize = Math.floor(Math.random() * variationSize) + minSize;

    bubblePositions[1][i] = {x: randomX, y: yPos, size: randomSize};
  }
  console.log(bubblePositions);

  return bubblePositions;
}


export const getBubbleBigSize = () => {
  const bubbleBigSizes = [
    350, 200
  ];

  return bubbleBigSizes;
}


export const getBubbleMoveDist = () => {
  const bubbleMoveDists = [
    100, 60
  ];

  return bubbleMoveDists;
}