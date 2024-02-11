const logger = require('../logger');

/**
 * Returns the first day of the month (FDOM) for a given date D. 
 * If no date is provided, the current date is used.
 * FDOM is considered the first Monday of D's month if D is on or after it;
 * otherwise, it is the first Monday of D's previous month.
 * 
 * @param {Date} date - The date for which to get the first day of the month.
 * @returns {Date} - The first day of the month.
 */
function getFirstDayOfMonth(date = new Date()) {
  // Get the nearest previous Monday
  const nearestMonday = new Date(date.toUTCString());
  nearestMonday.setDate(nearestMonday.getDate() - nearestMonday.getDay() + (nearestMonday.getDay() === 0 ? -6 : 1));

  // Get a day in week 1 of the month (by setting date to 7th)
  const dayInWeek1 = new Date(Date.UTC(nearestMonday.getFullYear(), nearestMonday.getMonth(), 7));

  // Get the nearest previous Monday of the day in week 1
  const result = new Date(dayInWeek1);
  result.setDate(dayInWeek1.getDate() - dayInWeek1.getDay() + (dayInWeek1.getDay() === 0 ? -6 : 1));
  logger.debug(`First day of month for ${date.toDateString()} is ${result.toDateString()}`);

  return result;
}

module.exports = { getFirstDayOfMonth };