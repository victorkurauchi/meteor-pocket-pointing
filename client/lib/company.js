Meteor.subscribe("companies");

Template.company_form.events({
  "submit .new-company": function(event) {
    event.preventDefault();

    var form = event.target;
    var name = form.company.value;
    var company = {
      name: name
    };

    Meteor.call("addCompany", company);

    name = "";
    Session.set("reactiveCompany", company.name);
  }
});
