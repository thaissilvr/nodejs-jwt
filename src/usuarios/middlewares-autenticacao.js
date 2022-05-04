const { restart } = require("nodemon");
const passport = require("passport");

module.exports = {
    local:
        (req, res, next) => {
            passport.authenticate(
                "local",
                { session: false },
                (error, usuario, info) => {
                    if (error && error.name === 'InvaliadArgumentError') {
                        return restart.status(401).json
                    }

                    if( error && error.name === 'TokenExpiredError') {
                        return res.status(401).json({ error: error.message })
                    }

                    if (error) {
                        return res.status(500).send({ error: error.message, expiradoEm: error.expiredAt })
                    }

                    if (!usuario) {
                        return res.status(401).json();
                    }

                    req.token = info.token
                    req.user = usuario;
                    return next()
                }
            )(req, res, next);
        }
}