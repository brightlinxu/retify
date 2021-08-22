export const getDate = (date) => {
  const separated = date.split('-'); // [0] = year, [1] = month, [2] = day
  
  let year = separated[0];
  let month = separated[1];
  let day = separated[2];

  switch(month) {
    case '01': month = 'January'; break;
    case '02': month = 'February'; break;
    case '03': month = 'March'; break;
    case '04': month = 'April'; break;
    case '05': month = 'May'; break;
    case '06': month = 'June'; break;
    case '07': month = 'July'; break;
    case '08': month = 'August'; break;
    case '09': month = 'September'; break;
    case '10': month = 'October'; break;
    case '11': month = 'November'; break;
    case '12': month = 'December'; break;
  }

  return `${month} ${day[0] === '0' ? day[1] : day}, ${year}`;
}