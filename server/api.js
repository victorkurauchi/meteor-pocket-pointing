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

// projects
Meteor.publish("api/projects", function () {
  return Projects.find();
});

Meteor.method("api/projects/:id", function (id) {
  return Projects.findOne({_id: id});
}, {
  url: "api/projects/:id",
  getArgsFromRequest: function (request) {
    // Let's say we want this function to accept a form-encoded request with
    // fields named `a` and `b`.
    var content = request.params;

    console.log(content);

    // Since form enconding doesn't distinguish numbers and strings, we need
    // to parse it manually
    return [ content.id ];
  },
  httpMethod: "GET"
})

Meteor.method("api/appointments/user/:userid", function(id) {

});

// appointments
Meteor.method("api/appointments/project/:projectid/user/:userid", function(projectId, userId) {
  return Appointments.find({projectId: projectId, userId: userId});
});

Meteor.method("api/appointments/add", function (a, b) {
  var result = {
    sum: a + b
  };
  return result;
}, {
  url: "api/appointments/add",
  getArgsFromRequest: function (request) {
    console.log("damn bro...");
    // Let's say we want this function to accept a form-encoded request with
    // fields named `a` and `b`.
    var content = request.body;

    console.log(content);

    // Since form enconding doesn't distinguish numbers and strings, we need
    // to parse it manually
    return [ parseInt(content.a, 10), parseInt(content.b, 10) ];
  }
});

// login
// Projects
// project id
// appointments by user in project
