Meteor.methods({
  addEmployee: function(employee) {
    var _userId = Meteor.userId(),
      company;

    if (! _userId) {
      throw new Meteor.Error("not-authorized");
    }

    company = Companies.findOne({owner: _userId});

    if (! company) {
      throw new Meteor.Error("You can't insert a project without being owner of a company.");
    }

    Employees.insert({
      name: employee.name,
      email: employee.email,
      password: employee.password,
      createdAt: new Date(),
      manager: Meteor.userId(),
      company: company.name,
      companyId: company._id,
      changePasswordOnLogin: true,
      projectsIn: []
    });
  }
});

Meteor.publish("employees", function () {
  return Employees.find({}, {sort: {name: 1}});
});

Meteor.publish('singleEmployee', function(id) {
  check(id, String);
  return Employees.find({_id: id});
});
