export const getImgPositions = () => {
  // array that holds all positions of background iamges
  const imgPositions = [ // row = pic ID + 4
    {left: '33%', top: '45%'}, 
    {left: '89%', top: '23%'},
    {left: '11%', top: '85%'},
    {left: '69%', top: '65%'},
    {left: '55%', top: '50%'},
    {left: '8%', top: '24%'},
    {left: '61%', top: '17%'},
    {left: '86%', top: '86%'},
    {left: '43%', top: '73%'},
    {left: '20%', top: '48%'},
    {left: '76%', top: '38%'},
    {left: '92%', top: '50%'},
    {left: '30%', top: '70%'},
    {left: '27%', top: '18%'},
    {left: '56%', top: '87%'},
    {left: '49%', top: '28%'},
    {left: '8%', top: '56%'},
    {left: '82%', top: '57%'},
    {left: '73%', top: '19%'},
    {left: '31%', top: '91%'},
    {left: '40%', top: '15%'},
    {left: '74%', top: '86%'},
    {left: '45%', top: '51%'},
    {left: '18%', top: '25%'},
    {left: '56%', top: '69%'},
    {left: '65%', top: '36%'},
    {left: '19%', top: '66%'},
    {left: '44%', top: '92%'},
    {left: '65%', top: '86%'},
    {left: '92%', top: '67%'},
    {left: '50%', top: '8%'},
    {left: '22%', top: '81%'},
    {left: '9%', top: '40%'},
    {left: '78%', top: '72%'},
    {left: '18%', top: '9%'},
    {left: '94%', top: '82%'},
    {left: '68%', top: '48%'},
    {left: '80%', top: '12%'},
    {left: '24%', top: '32%'},
    {left: '58%', top: '33%'},
    {left: '34%', top: '25%'},
    {left: '42%', top: '35%'},
    {left: '38%', top: '91%'},
    {left: '84%', top: '40%'},
    {left: '86%', top: '69%'},
    {left: '23%', top: '92%'},
  ];

  return imgPositions;
}

export const getImgMoveDists = () => {
  const imgMoveDists = [];

  const MIN = 30, MAX = 60;
  const size = getImgPositions().length;
  for (let i = 0; i < size; ++i) {
    // find random x and y move dists
    let randx = Math.floor(Math.random() * (MAX - MIN) + MIN);
    let randy = Math.floor(Math.random() * (MAX - MIN) + MIN);
    // randomly multiple by -1
    if (Math.random() < 0.5) randx *= -1;
    if (Math.random() < 0.5) randy *= -1;

    imgMoveDists.push({x: randx, y: randy});
  }

  return imgMoveDists;
}