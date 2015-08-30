Template.registerHelper('formatDate', function(date) {
  if (date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  } else {
    return '';
  }
});

Template.registerHelper('calculateWorkedHours', function(checkin, breakin, breakout, checkout) {
  if (checkin && breakin && breakout && checkout) {
    var sum, tempTime, total, display;

    checkin = moment(checkin);
    breakin = moment(breakin);
    breakout = moment(breakout);
    checkout = moment(checkout);

    sum = checkout.diff(checkin);
    sum = sum - (breakout.diff(breakin));
    tempTime = moment.duration(sum);
    total = tempTime.hours() + ":" + tempTime.minutes() + ":" + tempTime.seconds();

    display = Calculator.calculateMonthly(tempTime);
    Session.set("workedMonthly", display);

    return total;
  } else {
    return 0;
  }
});

Template.registerHelper('getActiveCompany', function() {
  return Session.get('reactiveCompany');
});
