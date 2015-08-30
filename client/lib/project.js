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
  }
});
