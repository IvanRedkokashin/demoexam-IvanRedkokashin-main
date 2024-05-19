const {Users} = require("../models/db");

exports.updateEmail = async function (req, res, next) {
    try {
        const newEmail = req.body.email;
        const user = await Users.findOne({ where: { email: req.session.userEmail } });
        if (!user) {
            return res.status(404).send("Пользователь не найден");
        }
        user.email = newEmail;
        await user.save();
        req.session.userEmail = newEmail;
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            console.log("Почта пользователя обновлена: " + newEmail);
            res.redirect(302, '/');
        });
    } catch (err) {
        next(err);
    }
};
exports.updateName = async function (req, res, next) {
    try {
        const newName = req.body.name; 
        const user = await Users.findOne({ where: { email: req.session.userEmail } });
        if (!user) {
            return res.status(404).send("Пользователь не найден");
        }
        user.username = newName; 
        await user.save();
        req.session.userName = newName; 
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            console.log("Имя пользователя обновлено: " + newName);
            res.redirect(302, '/');
        });
    } catch (err) {
        next(err);
    }
};