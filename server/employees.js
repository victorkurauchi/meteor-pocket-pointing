Meteor.methods({
  addEmployee: function(employee) {
    var _userId = Meteor.userId(),
      company;

    if (! _userId) {
      throw new Meteor.Error("not-authorized");
    }

    company = Companies.findOne({owner: _userId});

    if (! company) {
      throw new Meteor.Error("You can't create a employee without being owner of a company.");
    }

    var registered = Employees.insert({
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

    if (registered) {
      // create external template asap
      var _badTemplate = [
        'Agora você tem acesso ao Pocket Pointing, basta baixar o app e realizar o login com seu email e a senha cadastrada: ',
        employee.passToEmail
      ].join("");

      Meteor.call('sendEmail',
            employee.email,
            'devops@ornitorrinko.com',
            'Pocket Pointing - Você foi cadastrado !',
            _badTemplate);
    }
  },
  deleteEmployee: function(id) {
    Employees.remove(id);
  }
});

Meteor.publish("employees", function () {
  return Employees.find({}, {sort: {name: 1}});
});

Meteor.publish('singleEmployee', function(id) {
  check(id, String);
  return Employees.find({_id: id});
});
