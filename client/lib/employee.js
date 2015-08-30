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
  self.monthlyHours = new ReactiveVar(0);
  self.autorun(function() {
    var userid = FlowRouter.getParam('id');
    self.subscribe('singleEmployee', userid);
    self.subscribe('getAppointmentsByEmployee', userid);
  });
});

Template.user_calendar.onRendered(function(){
  Calculator.clearWorked();
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
