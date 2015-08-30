this.Calculator = (function() {
  var self;
  self = {};

  getWorkedMonthly = function() {
    return self.workedMonthly;
  };
  clearWorked = function() {
    self.workedMonthly = 0;
  };
  calculateMonthly = function(timestamp) {
    var _duration, display;
    _duration = self.workedMonthly + timestamp;
    self.workedMonthly = moment.duration(_duration);

    display = self.workedMonthly.hours() + " horas e " + self.workedMonthly.minutes() + " minutos";

    return display;
  };
  init = function(params) {
    self.workedMonthly = 0;
    self.params = params || {};
  };
  return {
    init: init,
    getWorkedMonthly: getWorkedMonthly,
    clearWorked: clearWorked,
    calculateMonthly: calculateMonthly
  };
})();
