Meteor.methods({
  addProject: function (project) {
    // Make sure the user is logged in before inserting a task
    var _userId = Meteor.userId(),
      company;

    if (! _userId) {
      throw new Meteor.Error("not-authorized");
    }

    company = Companies.findOne({owner: _userId});

    if (! company) {
      throw new Meteor.Error("You can't insert a project without being owner of a company.");
    }

    Projects.insert({
      name: project.name,
      description: project.description,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      company: company.name,
      companyId: company._id
    });
  },
  deleteProject: function (id) {
    Projects.remove(id);
  }
});

Meteor.publish("projects", function () {
  return Projects.find({}, {sort: {createdAt: -1}});
});
