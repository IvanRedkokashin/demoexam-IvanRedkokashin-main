const {Scooters} = require("../models/db");
const {Equipements} = require("../models/db");
const {Bookings} = require("../models/db");
exports.createNewScooter = async (req, res, next) => {
    if (!req.body || !req.body.name ||!req.body.photo || !req.body.speed || !req.body.powerreserve || !req.body.weight || !req.body.quantity) {
        return res.status(400).send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Некорректные данные формы</h3> <a href='/admincontrol'>попробуйте еще раз</a></div>");
      }
    try {
        const existingScooters = await Scooters.findOne({ where: { name: req.body.name } });
        if (existingScooters) {
          return res.send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Товар с таким именем уже добавлен</h3> <a href='/admincontrol'>попробуйте еще раз</a></div>");
        } else {
          const newScooter = await Scooters.create({
            name: req.body.name,
            photo: req.body.photo,
            speed: req.body.speed,
            powerreserve: req.body.powerreserve,
            weight: req.body.weight,
            quantity: req.body.quantity,
          });
          console.log("Самокат добавлен");
          if (newScooter) {
            res.redirect("/admincontrol");
          } else {
            return res.status(500).send("Ошибка при установке данных в сессию");
          }
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка сервера");
      }      
};
exports.createNewEquipement = async (req, res, next) => {
    if (!req.body || !req.body.name ||!req.body.photo || !req.body.quantity) {
        return res.status(400).send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Некорректные данные формы</h3> <a href='/admincontrol'>попробуйте еще раз</a></div>");
      }
    try {
        const existingEquipement = await Equipements.findOne({ where: { name: req.body.name } });
        if (existingEquipement) {
          return res.send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Товар с таким именем уже добавлен</h3> <a href='/admincontrol'>попробуйте еще раз</a></div>");
        } else {
          const newEquipement = await Equipements.create({
            name: req.body.name,
            photo: req.body.photo,
            quantity: req.body.quantity,
          });
          console.log("Экипировка добавлена");
          if (newEquipement) {
            res.redirect("/admincontrol");
          } else {
            return res.status(500).send("Ошибка при установке данных в сессию");
          }
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка сервера");
      }      
};
exports.listItems = async (req, res, next) => {
    try {
        const scooters = await Scooters.findAll();
        const equipements = await Equipements.findAll();
        res.render("productlist", { scooters: scooters, equipements: equipements });
    } catch(err) {
        return next(err);
    }
};
exports.dellRezerved = async (req, res, next) => {
  try {
    if (!req.body || !req.body.formId || !req.body.scootersName || !req.body.scooterValue) {
      return res.status(400).send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Не найден запрос</h3> <a href='/admincontrol'>попробуйте еще раз</a></div>");
    }
    
    const formrezervedId = req.body.formId;
    const arrayid = JSON.parse(req.body.scootersName);
    const arrayquantity = JSON.parse(req.body.scooterValue);
    
    await Bookings.destroy({ where: { id: formrezervedId } });
    console.log("Запрос удален");

    const scootersToUpdate = await Scooters.findAll({ where: { name: arrayid } });
    scootersToUpdate.forEach(async (scooter, index) => {
        const updatedQuantity = scooter.quantity + arrayquantity[index]; // Возвращаем количество назад
        await Scooters.update({ quantity: updatedQuantity }, { where: { name: arrayid[index] } });
    });

    res.redirect("/admincontrol");
  } catch (err) {
    console.log("Ошибка при удалении запроса");
    return next(err);
  }
};
exports.dellItemsScooter = async (req, res, next) => {
  try {
    if (!req.body || !req.body.formdellScootersId) {
      return res.status(400).send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Не найден запрос</h3> <a href='/productlist'>попробуйте еще раз</a></div>");
    }
    const formscootersId = req.body.formdellScootersId;
    await Scooters.destroy({where: {id:formscootersId}});
    console.log("Scooter удален");
    
    res.redirect("/productlist");
  } catch (err) {
    console.log("Ошибка при удалении Scooter");
    return next(err);
  }
};
exports.dellItemsEquiments = async (req, res, next) => {
  try {
    if (!req.body || !req.body.formdellEquipementsId) {
      return res.status(400).send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Не найден запрос</h3> <a href='/productlist'>попробуйте еще раз</a></div>");
    }
    const formequipementsId = req.body.formdellEquipementsId;
    await Equipements.destroy({where: {id:formequipementsId}});
    console.log("Equipements удален");
    
    res.redirect("/productlist");
  } catch (err) {
    console.log("Ошибка при удалении Equipements");
    return next(err);
  }
};