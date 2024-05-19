const {Scooters} = require("../models/db");
const {Bookings} = require("../models/db");

exports.createNewBooking = async (req, res, next) => {
    if (!req.body  ||!req.body.username ||!req.body.personvalue  ||!req.body.scootersName || !req.body.scooterValue || !req.body.daterezerv || !req.body.time) {
        return res.status(400).send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Некорректные данные формы</h3> <a href='/'>попробуйте еще раз</a></div>");
    }
    try {
      const arrayid = req.body.scootersName;
      const arrayquantity = req.body.scooterValue.map(Number); 
      
      const newBooking = await Bookings.create({
          userName: req.body.username,
          bookingDate: req.body.daterezerv,
          bookingTime: req.body.time,
          scooterName: JSON.stringify(arrayid),
          userid: req.session.userEmail,
          quantity: JSON.stringify(arrayquantity),
          numberOfPeople: req.body.personvalue,
      });
      console.log("Заявка создана");
      
      const scootersToUpdate = await Scooters.findAll({ where: { name: arrayid } });
      scootersToUpdate.forEach(async (scooter, index) => {
          const updatedQuantity = scooter.quantity - arrayquantity[index];
          await Scooters.update({ quantity: updatedQuantity }, { where: { name: arrayid[index] } });
      });
      
      console.log("Таблица Scooters обновлена");
          if (newBooking) {
            res.redirect("/");
          } else {
            return res.status(500).send("Ошибка при создании заявки");
          }
      } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка сервера");
      }
};
exports.listScooters = async (req, res, next) => {
    try {
        const userEmail = req.session.userEmail;
        const userName = req.session.userName;
        const userRole = req.session.userRole;
        const scooters = await Scooters.findAll();
        res.render("homePage", { scooters: scooters, userEmail, userName, userRole});
    } catch(err) {
        return next(err);
    }
};
exports.listbookingUser = async (req, res, next) => {
  try {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const bookings = await Bookings.findAll({
      where: { userid: userEmail},
      attributes: ['bookingDate', 'bookingTime', 'scooterName', 'numberOfPeople', 'quantity']
  });
    res.render("userProfilePage",{ bookings:bookings, userEmail, userName }); 
  } catch (err) {
    return next(err);
  }
};
exports.listbookingAdmin = async (req, res, next) => {
  const userEmail = req.session.userEmail;
  const userName = req.session.userName;
  const bookings = await Bookings.findAll();
  
  bookings.forEach(async booking => {
      const dateFull = new Date();
      dateFull.setHours(3);
      dateFull.setMinutes(0);
      dateFull.setSeconds(0);

      const dateMinutes = new Date;
      let dateServer = String(dateFull) + " " + String(dateMinutes.getHours())+ ":" + String(dateMinutes.getMinutes());
      console.log("Сервер: " + dateServer);
      
      let dateBooking = `${booking.bookingDate} ${booking.bookingTime}`;
      console.log("Заявка: " + dateBooking);
      
      if (dateServer === dateBooking) {
          await Bookings.destroy({ where: { id: booking.id } });
          console.log('Время совпало, просроченные заявки были удалены.');
      } else {
          console.log('Время не совпало.');
      }
  });

  res.render("controlspage", { bookings: bookings, userEmail, userName });
};