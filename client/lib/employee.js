Meteor.subscribe("employees");

// reactivity
var getMonthlyHours = function () {
  if (monthlyHours) {
    return monthlyHours.get();
  } else {
    return null;
  }
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
  // if (monthlyHours) {
  //   console.log("adding..");
  //   var x = monthlyHours.get();
  //   x = x + total;
  //   monthlyHours.set(x);
  //   return monthlyHours.get();
  // }
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

    console.log( 'called');
    // Template.instance().monthlyHours.set(Template.instance().monthlyHours.get() + total);

    return total;
  } else {
    return 0;
  }
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
    var userid = FlowRouter.getParam('id');
    return Appointments.find({userId: userid});
  },
  currentMonth: function() {
    return moment().format('MMMM');
  },
  monthlyHours: function() {
    console.log("checking,,");
    return Template.instance().monthlyHours.get();
  },
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  }
});
