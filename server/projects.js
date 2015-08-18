Meteor.methods({
  addProject: function (project) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Projects.insert({
      name: project.name,
      description: project.description,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      company: 'Ornitorrinko',
      companydId: 1
    });
  },
  deleteProject: function (id) {
    Projects.remove(id);
  }
});

Meteor.publish("projects", function () {
  return Projects.find({}, {sort: {createdAt: -1}});
});
