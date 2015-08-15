Template.submit_form.events({
  "submit .new-project": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var form = event.target;
    var name = form.name.value;
    var description = form.description.value;
    var project = {
      name: name,
      description: description
    };

    Meteor.call("addProject", project);

    // Clear form
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
