const logger = require('../logger');

function getFirstMondayOfMonth(date = new Date()) {
  // Get the nearest previous Monday
  const nearestMonday = new Date(date.toUTCString());
  nearestMonday.setDate(nearestMonday.getDate() - nearestMonday.getDay() + (nearestMonday.getDay() === 0 ? -6 : 1));

  // Get a day in week 1 of the month (by setting date to 7th)
  const dayInWeek1 = new Date(Date.UTC(nearestMonday.getFullYear(), nearestMonday.getMonth(), 7));

  // Get the nearest previous Monday of the day in week 1
  const result = new Date(dayInWeek1);
  result.setDate(dayInWeek1.getDate() - dayInWeek1.getDay() + (dayInWeek1.getDay() === 0 ? -6 : 1));
  logger.debug(`First Monday of month is ${result.toDateString()}`);

  return result;
}

module.exports = { getFirstMondayOfMonth }