Meteor.methods({
  addAppointment: function(appointment) {
    if (! appointment.checkin) {
      throw new Meteor.Error("Informe pelo menos seu checkin :) ");
    }

    Appointments.insert({
      checkin: appointment.checkin,
      breakin: appointment.breakin || null,
      breakout: appointment.breakout || null,
      checkout: appointment.checkout || null,
      userId: appointment.userId,
      projectId: appointment.projectId,
      projectName: appointment.projectName,
      companyId: appointment.companyId,
      createdAt: new Date(),
      updatedAt: null
    });
  }
});
