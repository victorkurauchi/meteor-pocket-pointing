// Enable cross origin requests for all endpoints
JsonRoutes.setResponseHeaders({
  "Cache-Control": "no-store",
  "Pragma": "no-cache",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
});

// employees
Meteor.publish("api/employees", function () {
  return Employees.find();
});

// appointments
Meteor.method("api/appointments/project/:projectid/user/:userid", function(projectId, userId) {
  return Appointments.find({projectId: projectId, userId: userId});
});

Meteor.method("api/appointments/user/:userId/day/:day/project/:projectId", function (userId, day, projectId) {
  return Appointments.findOne({userId: userId, day: day, projectId: projectId});
}, {
  url: "api/appointments/user/:userId/day/:day/project/:projectId",
  getArgsFromRequest: function (request) {
    var content = request.params;
    return [ content.userId, parseInt(content.day, 10), content.projectId ];
  },
  httpMethod: "GET"
});

Meteor.method("api/appointments/add", function (appointment) {
  if (! appointment.checkin || ! appointment.userId) {
    throw new Meteor.Error("error",
      "Informe pelo menos seu checkin :)");
  }

  return Meteor.call("addAppointment", appointment);

}, {
  url: "api/appointments/add",
  getArgsFromRequest: function (request) {
    var content = request.body;
    return [ content ];
  }
});

Meteor.method("api/appointments/update", function (appointment) {
  if (! appointment._id || ! appointment.userId) {
    throw new Meteor.Error("error",
      "Informe o apontamento :)");
  }

  return Meteor.call("updateAppointment", appointment);
}, {
  url: "api/appointments/update",
  getArgsFromRequest: function (request) {
    var content = request.body;
    return [ content ];
  },
  httpMethod: "POST"
});

// login
Meteor.method("api/users/login", function (email, password) {
  var user = Employees.findOne({ email: email, password: password});
  var session;

  if (! user) {
    throw new Meteor.Error("not-found",
      "User with that username or email address not found.");
  }

  session = new Date() + user._id;
  session = session.toString();
  user.sessionId = CryptoJS.MD5(session).toString();

  return user;
}, {
  url: "api/users/login",
  getArgsFromRequest: function (request) {
    var content = request.body;
    return [ content.email, content.password ];
  },
  httpMethod: "POST"
});

// projects
Meteor.method("api/projects/:id", function (id) {
  return Projects.findOne({_id: id});
}, {
  url: "api/projects/:id",
  getArgsFromRequest: function (request) {
    var content = request.params;
    return [ content.id ];
  },
  httpMethod: "GET"
});

Meteor.method("api/appointments/user/:userid", function(id) {

});

// get projects where companyId from user matches.
Meteor.publish("api/company/id/projects", function (id) {
  return Projects.find({companyId: id});
}, {
  url: "api/company/:0/projects",
  httpMethod: "GET"
});
