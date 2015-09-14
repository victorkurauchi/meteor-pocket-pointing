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
