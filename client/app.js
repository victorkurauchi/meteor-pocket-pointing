BlazeLayout.setRoot("#core-head");

Template.body.helpers({
});

Template.dashboard.helpers({
});

Template.dashboard_main_content.helpers({
  projects: function() {
    if (Session.get("hideCompleted")) {
      // If hide completed is checked, filter projects
      return Projects.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    } else {
      // Otherwise, return all of the projects
      return Projects.find({owner: Meteor.userId()}, {sort: {createdAt: -1}});
    }
  },
  hideCompleted: function () {
    return Session.get("hideCompleted");
  }
});
