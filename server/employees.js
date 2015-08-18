Meteor.methods({
  addEmployee: function(employee) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Employees.insert({
      name: employee.name,
      email: employee.email,
      password: employee.password,
      createdAt: new Date(),
      manager: Meteor.userId(),
      company: 'Ornitorrinko',
      companydId: 1,
      changePasswordOnLogin: true
    });
  }
});

Meteor.publish("employees", function () {
  return Employees.find({}, {sort: {name: 1}});
});

Meteor.publish('singleEmployee', function(id) {
  check(id, String);
  // Make a delay manually to show the loading state
  Meteor._sleepForMs(1000);
  return Employees.find({_id: id});
});
