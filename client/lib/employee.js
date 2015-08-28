Meteor.subscribe("employees");

var _workedMonthly = 0;
var calculateMonthly = function(timestamp) {
  var _duration,
    display;
  _duration = _workedMonthly + timestamp;
  _workedMonthly = moment.duration(_duration);

  display = _workedMonthly.hours() + " horas e " + _workedMonthly.minutes() + " minutos";
  Session.set("workedMonthly", display);
};

Template.dashboard_employees.helpers({
  employees: function() {
    return Employees.find({}, {sort: {name: 1}});
  }
});

Template.dashboard_employees.events({
  "submit .new-employee": function(event) {
    event.preventDefault();

    var form = event.target;
    var hash = CryptoJS.MD5(form.password.value).toString();
    var employee = {
      name: form.name.value,
      email: form.email.value,
      password: hash,
      passToEmail: form.password.value
    };

    Meteor.call("addEmployee", employee);

    name = "";
    email = "";
    password = "";
  }
});

Template.list_employees.events({
  "click .delete": function () {
    Meteor.call("deleteEmployee", this._id);
  }
})

Template.user_calendar.onCreated(function() {
  var self = this;
  self.monthlyHours = new ReactiveVar(0);
  self.autorun(function() {
    var userid = FlowRouter.getParam('id');
    self.subscribe('singleEmployee', userid);
    self.subscribe('getAppointmentsByEmployee', userid);
  });
});

Template.registerHelper('formatDate', function(date) {
  if (date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  } else {
    return '';
  }
});

Template.registerHelper('calculateWorkedHours', function(checkin, breakin, breakout, checkout) {
  if (checkin && breakin && breakout && checkout) {
    var sum,
      tempTime,
      total;

    checkin = moment(checkin);
    breakin = moment(breakin);
    breakout = moment(breakout);
    checkout = moment(checkout);

    sum = checkout.diff(checkin);
    sum = sum - (breakout.diff(breakin));
    tempTime = moment.duration(sum);
    total = tempTime.hours() + ":" + tempTime.minutes() + ":" + tempTime.seconds();

    calculateMonthly(tempTime);

    return total;
  } else {
    return 0;
  }
});

Template.user_calendar.onRendered(function(){
  _workedMonthly = 0;
});

Template.user_calendar.events({
  'click button': function (event, template) {
    // increment the counter when button is clicked
    template.monthlyHours.set(template.monthlyHours.get() + 1);
  }
});

Template.user_calendar.helpers({
  employee: function() {
    var userid = FlowRouter.getParam('id');
    var employee = Employees.findOne({_id: userid}) || {};
    return employee;
  },
  user_calendar_day: function() {
    return Appointments.find({userId: FlowRouter.getParam('id')});
  },
  currentMonth: function() {
    return moment().format('MMMM');
  },
  monthlyHours: function() {
    return Session.get("workedMonthly") || 0;
  },
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  }
});
