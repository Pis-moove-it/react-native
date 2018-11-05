import strings from '../localization/';

export const transformTime = (min) => {
  if (min / 10 >= 1) {
    return min.toLocaleString();
  }
  return `0${min}`;
};

export const transformDay = (day) => {
  switch (day) {
    case 0:
      return strings.day0;
    case 1:
      return strings.day1;
    case 2:
      return strings.day2;
    case 3:
      return strings.day3;
    case 4:
      return strings.day4;
    case 5:
      return strings.day5;
    case 6:
      return strings.day6;
    default:
      return 'error parsing day';
  }
};

export const transformMonth = (month) => {
  switch (month) {
    case 0:
      return strings.month0;
    case 1:
      return strings.month1;
    case 2:
      return strings.month2;
    case 3:
      return strings.month3;
    case 4:
      return strings.month4;
    case 5:
      return strings.month5;
    case 6:
      return strings.month6;
    case 7:
      return strings.month7;
    case 8:
      return strings.month8;
    case 9:
      return strings.month9;
    case 10:
      return strings.month10;
    case 11:
      return strings.month11;
    default:
      return 'error parsing month';
  }
};
