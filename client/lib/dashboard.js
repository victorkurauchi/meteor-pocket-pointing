Template.dashboard_main_content.helpers({
  projects: function() {
    return Projects.find({owner: Meteor.userId()}, {sort: {createdAt: -1}});
  }
});

Template.dashboard.onRendered(function () {
  var _a = Companies.findOne({ owner: Meteor.userId() });
  if (_a) {
    Session.set('reactiveCompany', _a.name);
  }
});

Template.dashboard.helpers({
  reactiveCompany: function() {
    return Session.get('reactiveCompany');
  }
})
