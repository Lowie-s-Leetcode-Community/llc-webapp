function getFirstMondayOfMonth() {
    const day = new Date();
    day.setDate(1);
    while (day.getDay() !== 1) {
      day.setDate(day.getDate() + 1);
    }
    return day;
  }
  
function getFirstMondayOfNextMonth() {
    const day = new Date();
    const month = day.getMonth() + 1;
    day.setDate(1);
    day.setMonth(month);
    while (day.getDay() !== 1) {
      day.setDate(day.getDate() + 1);
    }
    return day;
}

module.exports = {getFirstMondayOfMonth, getFirstMondayOfNextMonth}