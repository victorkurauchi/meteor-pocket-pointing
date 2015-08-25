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
      password: hash
    };

    Meteor.call("addEmployee", employee);

    name = "";
    email = "";
    password = "";
  }
});

Template.user_calendar.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var userid = FlowRouter.getParam('id');
    self.subscribe('singleEmployee', userid);
    self.subscribe('getAppointmentsByEmployee', userid);
  });
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD/MM/YYYY HH:mm:ss');
});

Template.registerHelper('calculateWorkedHours', function(checkin, breakin, breakout, checkout) {
  var sum;

  checkin = moment(checkin);
  breakin = moment(breakin);
  breakout = moment(breakout);
  checkout = moment(checkout);

  sum = checkout.diff(checkin, 'hours');
  sum = sum - (breakout.diff(breakin, 'hours'));

  return sum;
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
