// ********************************************
// ***** Vraća ponedjeljak tekućeg tjedna
export function getCurrentMonday() {
  const today = new Date();

  // getDay() - nedjelja 0 do subota 6
  let daysFromMonday = today.getDay() - 1;

  // nedjelja je nama zadnji, a ne prvi dan
  // sada je -1 i namješzamo je na 6 dana od ponedjeljka
  if (daysFromMonday < 0) {
    daysFromMonday = 6;
  }

  today.setDate(today.getDate() - daysFromMonday);

  return today;
}

// ********************************************
// ***** Vraća sutrašnji dan
export function getTomorrow() {
  const today = new Date();

  today.setDate(today.getDate() + 1);

  return today;
}

// ********************************************
// ***** Formatira vrijeme termina
export function formatTime(timeFloat) {
  const hour = Math.floor(timeFloat);
  const min = Math.floor((timeFloat - hour) * 60);
  return `${hour < 10 ? '0' : ''}${hour}:${min < 10 ? '0' : ''}${min}`;
}

// ********************************************
// ***** Convert date to string 'YYYY-MM-DD'
export function toISODateString(date) {
  return date.toISOString().substr(0, 10);
}

// ********************************************
// ***** Je li broj paran
export function isEven(n) {
  return n % 2 === 0;
}
