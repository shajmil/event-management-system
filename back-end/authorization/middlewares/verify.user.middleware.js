const UserModel = require('../../users/models/users.model');
const crypto = require('crypto');

exports.hasRegisterValidFields = (req, res, next) => {
    let errors = [];

    if (!req.body){
        return res.status(400).send({errors: 'Missing inout fields'});
    }
    if (!req.body.email) {
        errors.push('Missing email field');
    }
    if (!req.body.password) {
        errors.push('Missing password field');
    }
    if (!req.body.passwordConfirm) {
        errors.push('Missing password confirmation field');
    }
    if (!req.body.firstName || !req.body.lastName) {
        errors.push('Missing name fields');
    }
    if (errors.length) {
        return res.status(400).send({errors: errors.join(',')});
    } else {
        return next();
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findByEmail(req.body.email)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({});
            }else{
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user[0]._id,
                        email: user[0].email,

                        name: user[0].firstName + ' ' + user[0].lastName,
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        });
};