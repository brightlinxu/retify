export const getBubblePositions = () => {
  const bubblePositions = [
    [
      {x: 230, y: 180, size: 300}, {x: 550, y: 220, size: 240}, {x: 850, y: 230, size: 280}, /* 2, 3, 4 */
      {x: 350, y: 450, size: 230}, {x: 640, y: 490, size: 260}, {x: 950, y: 610, size: 230}, /* 5, 6, 7 */
      {x: 150, y: 660, size: 270}, {x: 450, y: 730, size: 230}, {x: 720, y: 750, size: 210}, /* 8, 9, 10 */
      {x: 230, y: 920, size: 200}, {x: 560, y: 1010, size: 280}, {x: 870, y: 970, size: 250}, /* 11, 12, 13 */
      {x: 280, y: 1180, size: 250}, {x: 720, y: 1250, size: 200}, {x: 970, y: 1230, size: 220}, /* 14, 15, 16 */
      {x: 150, y: 1430, size: 230}, {x: 500, y: 1410, size: 250}, {x: 900, y: 1530, size: 300}, /* 17, 18, 19 */
      {x: 340, y: 1660, size: 250}, {x: 630, y: 1690, size: 230} /* 20, 21 */
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