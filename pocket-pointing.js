Projects = new Mongo.Collection("projects");

if (Meteor.isClient) {
  Template.body.helpers({
  });

  Template.dashboard.helpers({
    projects: function() {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter projects
        return Projects.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the projects
        return Projects.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    }
  });

  Template.submit_form.events({
    "submit .new-project": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var form = event.target;
      var name = form.name.value;
      var description = form.description.value;

      // Insert a task into the collection
      Projects.insert({
        name: name,
        description: description,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        company: 'Ornitorrinko',
        companydId: 1
      });

      // Clear form
      event.target.name.value = "";
      event.target.description.value = "";
    },

    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.project.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Projects.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Projects.remove(this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
