// login
Meteor.method("api/users/login", function (email, password) {
  var user = Employees.findOne({ email: email, password: password});
  var session;

  if (! user) {
    throw new Meteor.Error("not-found",
      "User with that username or email address not found.");
  }

  session = new Date() + user._id;
  session = session.toString();
  user.sessionId = CryptoJS.MD5(session).toString();

  return user;
}, {
  url: "api/users/login",
  getArgsFromRequest: function (request) {
    var content = request.body;
    return [ content.email, content.password ];
  },
  httpMethod: "POST"
});
