Meteor.methods({
  addAppointment: function(appointment) {
    if (! appointment.checkin) {
      throw new Meteor.Error("Informe pelo menos seu checkin :) ");
    }

    var _appointment = Appointments.insert({
      checkin: appointment.checkin,
      breakin: appointment.breakin || null,
      breakout: appointment.breakout || null,
      checkout: appointment.checkout || null,
      userId: appointment.userId,
      projectId: appointment.projectId,
      projectName: appointment.projectName,
      companyId: appointment.companyId,
      createdAt: new Date(),
      day: new Date().getDate(),
      updatedAt: appointment.updatedAt || null
    });

    var result = {_id: _appointment};
    return result;
  },

  updateAppointment: function(data) {
    var updatedFields = {};
    var id;
    updatedFields.updatedAt = new Date();

    if (! data._id) {
      throw new Meteor.Error("Informe pelo menos seu checkin :) ");
    } else {
      id = data._id;
      delete data._id;
    }

    for (var x in data) {
      updatedFields[x] = data[x];
    }

    var _updated = Appointments.update({_id: id}, {$set: updatedFields});
    var result = {updated: _updated};

    return result;
  },

  getAppointmentsFromUser: function(userId) {
    if (! userId) {
      throw new Meteor.Error("Usuário não encontrado ;s ");
    }

    Appointments.find({ userId: userId });
  },

  getAppointmentsFromUserInCompany: function(userId, companyId) {
    if (! userId || ! companyId) {
      throw new Meteor.Error("Informe usuário e empresa ;s ");
    }

    Appointments.find({ userId: userId, companyId: companyId});
  }
});

Meteor.publish("getAppointmentsByEmployee", function (id) {
  return Appointments.find({userId: id}, {sort: {createdAt: 1}});
});
