const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    //req btayga ki validation me error hai ya nhi
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const {fullname, email, password} = req.body;
    //password ko hum direct store nhi kr skde...hash krna pdga
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword
    });
    //user create hogya aab token generate krvna
    const token = user.generateAuthToken();
    res.status(201).json({token,user});
}
