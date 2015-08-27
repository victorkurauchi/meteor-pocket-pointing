Meteor.methods({
  addCompany: function(company) {
    Companies.insert({
      name: company.name,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteCompany: function(id) {
    Companies.remove(id);
  }
});

Meteor.publish("companies", function () {
  return Companies.find({owner: this.userId}, {sort: {createdAt: -1}});
});
