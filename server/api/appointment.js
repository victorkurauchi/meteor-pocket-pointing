// Get all appointments from specific user on specific project
Meteor.method("api/appointments/project/:projectid/user/:userid", function(projectId, userId) {
  return Appointments.find({projectId: projectId, userId: userId});
}, {
  url: "api/appointments/project/:projectid/user/:userid",
  getArgsFromRequest: function (request) {
    var content = request.params;
    return [ content.userId, content.projectId ];
  },
  httpMethod: "GET"
});

// Get all appointments from specific user
Meteor.method("api/appointments/user/:userId/all", function (userId) {
  return Appointments.find({userId: userId});
}, {
  url: "api/appointments/user/:userId/all",
  getArgsFromRequest: function (request) {
    var content = request.params;
    return [ content.userId ];
  },
  httpMethod: "GET"
});

// Get appointment for specific user, specific day, specific project
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

// New appointment created by user
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

// Update appointment by user
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
