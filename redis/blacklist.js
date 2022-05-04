const redis = require("redis")

modules.exports = redis.createClient(
    { 
        prefix: "blacklist:"
    }
);