FlowRouter.route('/', {
  action: function(params, queryParams) {
    var layout = Meteor.user() ? "dashboard" : "index";
    BlazeLayout.render(layout, { core: "dashboard_main_content" });
  }
});

FlowRouter.route('/appointments/:projectid', {
  triggersEnter: [trackRouteEntry],
  action: function(params, queryParams) {
    FlowLayout.render('dashboard', { core: "users_appointments" });
  }
});

function trackRouteEntry(context) {
  // context is the output of `FlowRouter.current()`
  BlazeLayout.setRoot("#container-blaze");
  // Mixpanel.track("visit-to-home", context.queryParams);
}
