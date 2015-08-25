FlowRouter.route('/', {
  action: function(params, queryParams) {
    var layout = Meteor.user() ? "dashboard" : "index";
    BlazeLayout.render(layout, { core: "dashboard_main_content" });
  }
});

FlowRouter.route('/project/:id/appointments', {
  triggersEnter: [trackRouteEntry],
  action: function(params, queryParams) {
    BlazeLayout.render('dashboard', { core: "users_appointments" });
  }
});

FlowRouter.route('/company/employees', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashboard', { core: "dashboard_employees" });
  }
});

FlowRouter.route('/user/:id/appointments', {
  subscriptions: function(params, queryParams) {
  },
  action: function(params, queryParams) {
    BlazeLayout.render('dashboard', { core: "user_calendar" });
  }
});

function trackRouteEntry(context) {
  // context is the output of `FlowRouter.current()`
  BlazeLayout.setRoot("#core-head");
  // Mixpanel.track("visit-to-home", context.queryParams);
}
