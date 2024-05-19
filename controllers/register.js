const {Users} = require("../models/db");
const bcrypt = require("bcrypt");

exports.submitIsForm = async (req, res, next) => {
    console.log("req,body");

    if (!req.body || !req.body.role ||!req.body.username || !req.body.usersurname || !req.body.age || !req.body.email || !req.body.password) {
        return res.status(400).send("Некорректные данные формы <a href='/register'>вернуться</a>");
      }
    if (!req.body.policeconfig){
      return res.status(400).send("Вы несогласны с пользовательским соглашением <a href='/register'>вернуться</a>");
    }
    try {
        const existingUser = await Users.findOne({ where: { email: req.body.email } });
        if (existingUser) {
          return res.send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Вы уже зарегистрированы</h3> <a href='/login'>попробуйте войти</a></div>");
        } else {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const newUser = await Users.create({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
            usersurname: req.body.usersurname,
            age: req.body.age,
            role: req.body.role,
          });
          req.session.userEmail = req.body.email;
          req.session.userName = req.body.username;
          console.log("Пользователь создан");
          if (req.session.userEmail && req.session.userName) {
            res.redirect("/");
          } else {
            return res.status(500).send("Ошибка при установке данных в сессию");
          }
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка сервера");
      }      
};