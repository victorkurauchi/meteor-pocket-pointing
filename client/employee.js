Meteor.subscribe("employees");

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
    total = tempTime.hours() + ":" + tempTime.minutes();

    return total;
  } else {
    return 0;
  }
});

Template.user_calendar.helpers({
  employee: function() {
    var userid = FlowRouter.getParam('id');
    var employee = Employees.findOne({_id: userid}) || {};
    return employee;
  },
  user_calendar_day: function() {
    var userid = FlowRouter.getParam('id');
    return Appointments.find({userId: userid});
  },
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  }
});
