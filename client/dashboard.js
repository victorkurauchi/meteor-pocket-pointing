Template.dashboard_main_content.helpers({
  projects: function() {
    return Projects.find({owner: Meteor.userId()}, {sort: {createdAt: -1}});
  }
});
