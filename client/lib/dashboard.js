Template.dashboard.events({
  "click .logout": function() {
    Meteor.logout(function() {
      window.location.href = "/";
    });
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
  },
  userInfo: function() {
    return Meteor.user();
  },
  userEmail: function() {
    return Meteor.user().emails[0].address;
  },
  userSubstr: function() {
    return Meteor.user().emails[0].address.split("@")[0];
  }
})

// dashboard main projects
Template.dashboard_main_content.helpers({
  projects: function() {
    return Projects.find({owner: Meteor.userId()}, {sort: {createdAt: -1}});
  }
});

Template.dashboard_main_content.events({
  "click .delete": function () {
    Meteor.call("deleteProject", this._id);
  }
});
