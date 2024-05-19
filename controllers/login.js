const {Users} = require("../models/db");
const bcrypt = require("bcrypt");

async function authentificate(dataIsForm, cb) {
    try {
      const user = await Users.findOne({ where: { email: dataIsForm.email } }); 
      if (!user) return cb();
      
      const passwordMatch = await bcrypt.compare(dataIsForm.password, user.password);
      if (passwordMatch) {
        return cb(null, user);
      } else {
        return cb();
      }
    } catch (err) {
      return cb(err);
    }
  }
  exports.submit = (req, res, next) => {
    authentificate(req.body, (error, data) => {
        if (error) return next(error);
        if (!data) {
            res.send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Логин или пароль не верны</h3> <a href='/login'>попробуйте еще раз</a></div>");
        } else {
            const name = data.username;
            const email = data.email;
            const role = data.role;
            const User = {
                userName: name,
                userEmail: email,
                userRole: role
            }
            req.session.userEmail = User.userEmail;
            req.session.userName = User.userName;
            req.session.userRole = User.userRole;
            console.log("Получили данные от пользователя " + User.userName + " с его почты " + User.userEmail + " и ролью " + User.userRole);
            console.log(req.session.userEmail + " Сессия создана");
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                console.log("Сессия сохранена");
                res.redirect(302, '/');
            });
        }
    });
}; 
  exports.logout = function (req, res, next) {
    req.session.destroy((err) => {
      if (err) return next(err);
      console.log("Сессия удалена");
      res.redirect("/");
    });
  };