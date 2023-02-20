const jwt = require("jsonwebtoken")


const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        const decoded = jwt.verify(token, 'shhhhh');
        if (decoded) {
            const userID = decoded.userID
            req.body.userId = userID
            next()
        } else {
            res.send("authenticate yourself first")
        }
    }
    else {
        res.send("authenticate yourself first")
    }
}

module.exports = { authenticate }