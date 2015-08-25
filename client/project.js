Meteor.subscribe("projects");

Template.submit_form.events({
  "submit .new-project": function (event) {
    event.preventDefault();

    var form = event.target;
    var name = form.name.value;
    var description = form.description.value;
    var project = {
      name: name,
      description: description
    };

    Meteor.call("addProject", project);

    name = "";
    description = "";
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
    Meteor.call("deleteProject", this._id);
  }
});
