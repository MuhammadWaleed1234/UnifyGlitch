const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.Authorization.split("")[1];
        const decoded = jwt.verify(token, process.env.JWT_secretKey);
        req.decodedData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Auth failed", error:error });
    }


};




////////test data

// {

//     "name": "Muhammad Waleed",
//     "email": "l226824@lhr.nu.edu.pk",
//     "password": "**************",





// "admin":{
// "name":"Waleed",
// "email": "a@b.c",
// "password":"Ab123456!",
// "user_id":"66ca60f9f6b3b2e5a7f654da"
// }
// }
