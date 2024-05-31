// othermonth.js

// 이전 달로 이동하는 함수
export function handlePrevMonth(month, year, setMonth, setYear) {
  if (month === 0) {
    setYear(year - 1);
    setMonth(11);
  } else {
    setMonth(month - 1);
  }
}

// 다음 달로 이동하는 함수
export function handleNextMonth(month, year, setMonth, setYear) {
  if (month === 11) {
    setYear(year + 1);
    setMonth(0);
  } else {
    setMonth(month + 1);
  }
}
