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
     [
       {x: 200, y: 100, size: 200}, {x: 300, y: 200, size: 180}, {x: 325, y: 425, size: 170},
       {x: 620, y: 350, size: 160}, {x: 500, y: 475, size: 160}, {x: 450, y: 300, size: 150},
       {x: 575, y: 900, size: 150}
     ]
   ];

  return bubblePositions;
}


export const getBubbleBigSize = () => {
  const bubbleBigSizes = [
    350, 300
  ];

  return bubbleBigSizes;
}


export const getBubbleMoveDist = () => {
  const bubbleMoveDists = [
    100, 80
  ];

  return bubbleMoveDists;
}