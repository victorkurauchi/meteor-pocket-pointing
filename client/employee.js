Meteor.subscribe("employees");

Template.dashboard_employees.helpers({
  employees: function() {
    return Employees.find({}, {sort: {name: 1}});
  }
});

Template.user_calendar.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var userid = FlowRouter.getParam('id');
    self.subscribe('singleEmployee', userid);
  });
});

Template.user_calendar.helpers({
  employee: function() {
    var userid = FlowRouter.getParam('id');
    var employee = Employees.findOne({_id: userid}) || {};
    return employee;
  }
});

Template.user_calendar.helpers({
  user_calendar_day: function() {
    return [{
      dateObject: new Date(),
      day: "",
      year: "",
      month: "",
      checkin: "8h",
      breakin: "12h",
      breakout: "13h",
      checkout: "14h"
    }];
  },
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  }
})

Template.dashboard_employees.events({
  "submit .new-employee": function(event) {
    event.preventDefault();

    var form = event.target;
    var employee = {
      name: form.name.value,
      email: form.email.value,
      password: form.email.password
    };

    Meteor.call("addEmployee", employee);

    name = "";
    email = "";
    password = "";
  }

});
