const blacklist = require("./blacklist1")

const { promisify } = require("util")
const existsAsync = promisify(blacklist.exists).bind(blacklist)

module.exports = {
    adiciona: token => {
        blacklist.set(token, "");
    },
    contemToken: async token => {
        const resultado = await existsAsync(token)
        return resultado === 1;
    }
}
