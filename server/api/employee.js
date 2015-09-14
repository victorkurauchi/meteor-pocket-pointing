// employees
Meteor.publish("api/employees", function () {
  return Employees.find();
});
